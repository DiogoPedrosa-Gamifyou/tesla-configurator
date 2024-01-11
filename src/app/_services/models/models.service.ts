import { Injectable } from '@angular/core';
import { Observable, map, catchError, BehaviorSubject } from 'rxjs';
import { ApiService } from '../api/api.service';
import { Model, ModelColor, ModelOptions } from '../../_models/models.model';


@Injectable({
  providedIn: 'root'
})
export class ModelsService {

  private teslaModelsSubject: BehaviorSubject<Array<Model>> = new BehaviorSubject<Array<Model>>([]);
  public teslaModels$: Observable<Array<Model>> = this.teslaModelsSubject.asObservable();

  private teslaModelOptionsSubject: BehaviorSubject<Array<ModelOptions>> = new BehaviorSubject<Array<ModelOptions>>([]);
  public teslaModelOptions$: Observable<Array<ModelOptions>> = this.teslaModelOptionsSubject.asObservable();

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

  public getOptions(): Observable<Array<ModelOptions>> {
    return this.apiService.get<Array<ModelOptions>>(`/options/${this.selectedModel?.code}`).pipe(
      map((response: Array<ModelOptions>) => {

        this.teslaModelOptionsSubject.next(response);

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

  public get modelOptions(): Array<ModelOptions> {
    return this.teslaModelOptionsSubject.value;
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
    this.selectedTeslaModelColor = this.selectedTeslaModel?.colors.find(color => color.code === selectedCode) ?? this.selectedTeslaModel?.colors[0];
  }
}
