import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InventoryService } from '../../app-logic/inventory-service.service';
import { InventoryItem } from '../../app-logic/inventory-item';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogBoxComponent } from '../../dialog-box/dialog-box.component';
import { finalize, tap, switchMap } from 'rxjs/operators';
import { merge, BehaviorSubject, forkJoin, Observable, EMPTY } from 'rxjs';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  isLoading: boolean;
  selection = new SelectionModel<InventoryItem>(true, []);
  inventoryItems: InventoryItem[];
  activeOnly$ = new BehaviorSubject(true);
  itemsCount = 0;
  requiredRefresh: EventEmitter<any> = new EventEmitter();
  inventoryColumns: string[] = [
    'select',
    'id',
    'name',
    'user',
    'description',
    'location',
    'inventoryNumber',
    'createdAt',
    'modifiedAt',
    'deleted',
    'action',
  ];

  constructor(
    private inventoryService: InventoryService,
    public dialog: MatDialog
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
      this.sort.sort,
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
          this.inventoryItems = data[0];
          this.itemsCount = data[1];
          this.isLoading = false;
        },
        (error) => {
          console.log('Table could not be filled with data', error);
          this.isLoading = false;
          alert('${error.status} ${error.statusText}');
        }
      );
  }

  masterToggle() {
    console.log(this.inventoryItems);
    this.isAllItemsSelected()
      ? this.selection.clear()
      : this.inventoryItems.forEach((row) => {
          this.selection.select(row);
        });
  }

  isAllItemsSelected() {
    const selectedItems = this.selection.selected.length;
    const numOfRows = this.inventoryItems.length;
    return selectedItems === numOfRows;
  }

  isAnyItemSelected() {
    return this.selection.selected.length !== 0;
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
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

  toggleChanged() {
    this.paginator.pageIndex = 0;
    this.activeOnly = !this.activeOnly;
  }

  updateRowData(userInputData) {
    let temp: InventoryItem = new InventoryItem();
    temp.id = userInputData.id;
    temp.name = userInputData.name;
    temp.user = userInputData.user;
    temp.description = userInputData.description;
    temp.location = userInputData.location;
    temp.inventoryNumber = userInputData.inventoryNumber;
    temp.modifiedAt = new Date();

    this.isLoading = true;
    this.inventoryService
      .updateItem(temp)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(() => {
        this.requiredRefresh.emit(null);
      });
  }

  deleteRowData(userInputData) {
    this.isLoading = true;
    this.inventoryService
      .deleteItem(userInputData.id.toString())
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
