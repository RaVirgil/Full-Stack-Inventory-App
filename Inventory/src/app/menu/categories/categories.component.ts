import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { finalize, tap, switchMap } from 'rxjs/operators';
import { merge, BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { CategoryService } from 'src/app/@core/services/category.service';
import { Category } from 'src/app/@core/entities/category';
import { CategoryDialogBoxComponent } from 'src/app/shared/category-dialog-box/category-dialog-box.component';
import { AuthenticationService } from 'src/app/@core/services/authentication.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  isLoading: boolean;
  selection = new SelectionModel<Category>(true, []);
  categories: Category[] = [];
  activeOnly$ = new BehaviorSubject(true);
  itemsCount = 0;
  requiredRefresh: EventEmitter<any> = new EventEmitter();
  inventoryColumns: string[] = [
    'select',
    'id',
    'name',
    'type',
    'subCategories',    
    'active',
    'user',
    'action',
  ];

  constructor(    
    private readonly categoryService: CategoryService,
    private readonly authenticationService: AuthenticationService,
    public dialog: MatDialog,    
  ) {}

  get activeOnly(): boolean {
    return this.activeOnly$.value;
  }
  set activeOnly(v: boolean) {
    this.activeOnly$.next(v);
  }

  ngOnInit(): void {
    merge(
      this.sort.sortChange,
      this.activeOnly$,
      this.requiredRefresh
    ).subscribe(() => {
      this.paginator.pageIndex = 0;
    });

    merge(
      this.sort.sortChange,
      //this.sort.sort,
      this.activeOnly$,
      this.requiredRefresh
    ).subscribe(() => {
      this.selection.clear();
    });

    merge(
      this.paginator.page,
      this.sort.sortChange,
      this.activeOnly$,
      this.requiredRefresh
    )
      .pipe(
        switchMap(() => {
          this.isLoading = true;
          this.selection.clear();
          return this.categoryService.getSome(
            this.paginator.pageIndex + 1,
            this.paginator.pageSize,
            this.activeOnly,
            this.sort.active
              ? `${this.sort.active}_${
                  this.sort.direction ? this.sort.direction : 'asc'
                }`
              : ''
          );
        })
      )
      .subscribe(
        (data) => {
          this.categories = data[0]!;
          this.itemsCount = data[1];
          this.isLoading = false;
        },
        (error) => {          
          this.isLoading = false;
          console.log(error);
        }
      );
  }

  masterToggle() {    
    this.isAllItemsSelected()
      ? this.selection.clear()
      : this.categories.forEach((row) => {
          this.selection.select(row);
        });
  }

  isAllItemsSelected() {
    const selectedItems = this.selection.selected.length;
    const numOfRows = this.categories.length;
    return selectedItems === numOfRows;
  }

  isAnyItemSelected() {
    return this.selection.selected.length !== 0;
  }

  openDialog(action: any, obj: { action: any; categories: Category[] }) {
    obj.action = action;    
      obj.categories = this.categories;
      const dialogRef = this.dialog.open(CategoryDialogBoxComponent, {
        height: '80vh',
        width: '50vw',
        data: obj,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result.event === 'Update') {
          this.updateData(result.data);
        } else if (result.event === 'Delete') {
          this.deleteData(result.data);
        }
      });    
  }

  markActive() {
    if (this.selection.selected.length == 0)
      alert('Please mark something first');
    else {
      const markItemRequests$: Observable<any>[] = [];

      let noOfItems = this.selection.selected.length;

      let markedSelection = this.selection.selected.map((item) =>
        Object.assign({}, item)
      );

      markedSelection.forEach((selectionItem) => {
        selectionItem.active = true;
        selectionItem.modifiedAt = new Date();
      });

      markedSelection.forEach((selectionItem) => {
        markItemRequests$.push(this.categoryService.update(selectionItem));
      });

      forkJoin(markItemRequests$)
        .pipe(
          tap((resp) => {
            if (resp != null)
              alert(
                `${noOfItems} ${
                  noOfItems == 1 ? 'item' : 'items'
                } marked as active.`
              );
          })
        )
        .subscribe(() => {
          this.requiredRefresh.emit(null);
        });
      this.selection.clear();
    }
  }

  markInactive() {
    if (this.selection.selected.length == 0)
      alert('Please mark something first');
    else {
      const markItemRequests$: Observable<any>[] = [];

      let noOfItems = this.selection.selected.length;

      let markedSelection = this.selection.selected.map((item) =>
        Object.assign({}, item)
      );

      markedSelection.forEach((selectionItem) => {
        selectionItem.active = false;
        selectionItem.modifiedAt = new Date();
      });

      markedSelection.forEach((selectionItem) => {
        markItemRequests$.push(this.categoryService.update(selectionItem));
      });

      forkJoin(markItemRequests$)
        .pipe(
          tap((resp) => {
            if (resp != null)
              alert(
                `${noOfItems} ${
                  noOfItems == 1 ? 'item' : 'items'
                } marked as inactive.`
              );
          })
        )
        .subscribe(() => {
          this.requiredRefresh.emit(null);
        });

      this.selection.clear();
    }
  }

  deleteSelected() {
    if (this.selection.selected.length == 0)
      alert('Please mark something first');
    else {
      const markItemRequests$: Observable<any>[] = [];

      let noOfItems = this.selection.selected.length;

      let markedSelection = this.selection.selected.map((item) =>
        Object.assign({}, item)
      );

      markedSelection.forEach((selectionItem) => {
        markItemRequests$.push(
          this.categoryService.delete(selectionItem.id)
        );
      });

      forkJoin(markItemRequests$)
        .pipe(
          tap((resp) => {
            if (resp != null)
              alert(
                `${noOfItems} ${noOfItems == 1 ? 'item' : 'items'} deleted.`
              );
          })
        )
        .subscribe(() => {
          this.requiredRefresh.emit(null);
        });

      this.selection.clear();
    }
  }

  toggleChanged() {
    this.paginator.pageIndex = 0;
    this.activeOnly = !this.activeOnly;
  }

  updateData(category: Category): void {    
    category.modifiedAt = new Date();
    category.user = this.authenticationService.getUserName();
    this.isLoading = true;
    this.categoryService
      .update(category)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(() => {
        this.requiredRefresh.emit(null);
      });
  }

  deleteData(categoryId: { id: { toString: () => String } }) {
    this.isLoading = true;
    this.categoryService
      .delete(categoryId.id.toString())
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(() => {
        this.requiredRefresh.emit(null);
      });
  } 
}
