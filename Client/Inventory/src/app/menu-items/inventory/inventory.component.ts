import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InventoryListMockService } from '../../app-logic/inventory-list-mock.service';
import { InventoryService } from '../../app-logic/inventory-service.service';
import { InventoryItem } from '../../app-logic/inventory-item';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogBoxComponent } from '../../dialog-box/dialog-box.component';
import { finalize, tap } from 'rxjs/operators';
import { merge } from 'rxjs';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  isLoading: boolean;
  selection = new SelectionModel<Element>(true, []);
  inventoryItems: any;
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
    private inventoryListMockService: InventoryListMockService,
    private inventoryService: InventoryService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.inventoryService
      .getData()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data) => {
        this.inventoryItems = data;
      });

    merge(this.paginator.page, this.sort.sortChange)
      .pipe(
        tap(() => {
          this.isLoading = true;
          this.inventoryService
            .getData()
            .pipe(
              finalize(() => {
                this.isLoading = false;
              })
            )
            .subscribe(
              (data) => {
                this.inventoryItems = data;
              },
              (error) => {
                console.log('Table could not be filled with data', error);
              }
            );
        })
      )
      .subscribe();
  }

  masterToggle() {
    console.log(this.inventoryItems);
    this.isAllItemsSelected()
      ? this.selection.clear()
      : this.inventoryItems.data.forEach((row) => {
          this.selection.select(row);
        });
  }

  isAllItemsSelected() {
    const selectedItems = this.selection.selected.length;
    const numOfRows = this.inventoryItems.data.length;
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
      .subscribe((data) => {
        this.inventoryItems = data;
      });

      this.inventoryService
      .getData()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data) => {
        this.inventoryItems = data;
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
      .subscribe((data) => {
        this.inventoryItems = data;
      });

      this.inventoryService
      .getData()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data) => {
        this.inventoryItems = data;
      });
  }
}
