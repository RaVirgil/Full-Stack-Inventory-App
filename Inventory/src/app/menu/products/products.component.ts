import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { InventoryService } from '../../@core/services/inventory-service.service';
import { Product } from '../../@core/entities/product';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { ProductDialogBoxComponent } from '../../shared/product-item-dialog-box/product-dialog-box.component';
import { finalize, tap, switchMap } from 'rxjs/operators';
import { merge, BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { CategoryService } from 'src/app/@core/services/category.service';
import { Category } from 'src/app/@core/entities/category';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  isLoading: boolean;
  selection = new SelectionModel<Product>(true, []);
  products: Product[] = [];
  activeOnly$ = new BehaviorSubject(true);
  itemsCount = 0;
  requiredRefresh: EventEmitter<any> = new EventEmitter();
  inventoryColumns: string[] = [
    'select',
    'id',
    'name',
    'price',
    'quantity',
    'category',
    'subCategory',
    'modifiedAt',
    'active',
    'action',
  ];

  constructor(
    private readonly inventoryService: InventoryService,
    private readonly categoryService: CategoryService,
    public dialog: MatDialog,
    private router: Router
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
          return this.inventoryService.getData(
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
          this.products = data[0]!;
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
      : this.products.forEach((row) => {
          this.selection.select(row);
        });
  }

  isAllItemsSelected() {
    const selectedItems = this.selection.selected.length;
    const numOfRows = this.products.length;
    return selectedItems === numOfRows;
  }

  isAnyItemSelected() {
    return this.selection.selected.length !== 0;
  }

  openDialog(action: any, obj: { action: any; categories: Category[] }) {
    obj.action = action;
    this.categoryService.get().subscribe((categories) => {
      obj.categories = categories;
      const dialogRef = this.dialog.open(ProductDialogBoxComponent, {
        height: '80vh',
        width: '50vw',
        data: obj,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result?.event === 'Update') {
          this.updateRowData(result.data);
        } else if (result?.event === 'Delete') {
          this.deleteRowData(result.data);
        }
      });
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
        markItemRequests$.push(this.inventoryService.updateItem(selectionItem));
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
        markItemRequests$.push(this.inventoryService.updateItem(selectionItem));
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
          this.inventoryService.deleteItem(selectionItem.id)
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

  updateRowData(product: Product): void {
    product.modifiedAt = new Date();

    this.isLoading = true;
    this.inventoryService
      .updateItem(product)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(() => {
        this.requiredRefresh.emit(null);
      });
  }

  deleteRowData(productId: { id: { toString: () => String } }) {
    this.isLoading = true;
    this.inventoryService
      .deleteItem(productId.id.toString())
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(() => {
        this.requiredRefresh.emit(null);
      });
  }

  goToItem(element: { id: string }) {
    this.router.navigate(['/item/' + element.id]);
  }
}
