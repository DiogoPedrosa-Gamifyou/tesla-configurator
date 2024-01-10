import { Injectable } from '@angular/core';
import { Observable, of, map, catchError, BehaviorSubject } from 'rxjs';
import { Model, ModelColor } from '../../_models/models.model';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private teslaModelsSubject: BehaviorSubject<Array<Model>> = new BehaviorSubject<Array<Model>>([]);
  public teslaModels$: Observable<Array<Model>> = this.teslaModelsSubject.asObservable();

  private selectedTeslaModel: Model | undefined;
  private selectedTeslaModelColor: ModelColor | undefined;

  constructor(
    private apiService: ApiService
  ) { }

  public getModels(): Observable<Array<Model>> {
    return this.apiService.get<Array<Model>>('/models').pipe(
      map((response: Array<Model>) => {

        this.teslaModelsSubject.next(response);

        return response ?? [];
      }),
      catchError((err) => {
        return [];
      })
    );
  }

  public get models(): Array<Model> {
    return this.teslaModelsSubject.value;
  }

  public get selectedModel(): Model | undefined {
    return this.selectedTeslaModel;
  }

  public get selectedModelColor(): ModelColor | undefined {
    return this.selectedTeslaModelColor;
  }

  public setSelectedModel(selectedCode: string | null): void {
    this.selectedTeslaModel = this.teslaModelsSubject.value.find(model => model.code === selectedCode);
  }

  public setSelectedModelColor(selectedCode: string | null): void {
    this.selectedTeslaModelColor = this.selectedTeslaModel?.colors.find(color => color.code === selectedCode);
  }
}
