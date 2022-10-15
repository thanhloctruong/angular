import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
export interface WithList<T> {
  listOfData: Array<T>;
  getListOfData(): void;
}

export interface WithFilter<T> {
  filterParams: T;
  onSubmitFilter(filterParams: T): void;
}

export interface WithPagination<T> {
  pagination: T;
  onPageChange(pagination: T): void;
}

export interface WithCheckboxSelection<T> {
  selectedObjects: Array<T>;

  onCheckAll(checked: boolean): void;
  onCheck(target: T, checked: boolean): void;
}

export interface WithAction<T> {
  onDeleteAll(): void;
  onDelete(target: T): void;
  onUpdate(target: T): void;
  onCreate(target: T): void;
  onDetail(target: T): void;
}

export interface WithDownload<T> {
  onDownload(target: T): void;
  onDownloadAll(): void;
}

export interface WithExport<T> {
  onExport(target: T): void;
  onExportAll(): void;
}

export interface WithT<T> {
  [key: string]: T;
}

export type FormGroupValue<T> = {
  value: T;
};
export type FormGroupWith<T> = Required<FormGroup<Record<keyof T, FormControl<any>>>> & AbstractControl<any>;

export type WithForm<T> = {
  formGroup: FormGroupWith<T>;
  form: Record<keyof T, AbstractControl<T>>;
  initForm(): void;
  onSubmit(): void | undefined;
  reset(): void;
};

export type WithDetail<T> = WithT<T> & {
  getDetail(): void;
};
