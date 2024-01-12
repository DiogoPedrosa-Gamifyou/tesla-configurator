import { Injectable } from '@angular/core';
import { Observable, map, catchError, BehaviorSubject } from 'rxjs';
import { ApiService } from '../api/api.service';
import { Model, ModelColor, ModelOptions, SelectedOptionConfig } from '../../_models/models.model';


@Injectable({
  providedIn: 'root'
})
export class ModelsService {

  private teslaModelsSubject: BehaviorSubject<Array<Model>> = new BehaviorSubject<Array<Model>>([]);
  public teslaModels$: Observable<Array<Model>> = this.teslaModelsSubject.asObservable();

  private teslaModelOptionsSubject: BehaviorSubject<ModelOptions> = new BehaviorSubject<ModelOptions>({ configs: [], towHitch: false, yoke: false});
  public teslaModelOptions$: Observable<ModelOptions> = this.teslaModelOptionsSubject.asObservable();

  private selectedTeslaModel: Model | undefined;
  private selectedTeslaModelColor: ModelColor | undefined;

  public selectedModelConfig: SelectedOptionConfig | undefined;

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

  public getOptions(): Observable<ModelOptions> {
    return this.apiService.get<ModelOptions>(`/options/${this.selectedModel?.code}`).pipe(
      map((response: ModelOptions) => {

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

  public get modelOptions(): ModelOptions {
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

  public setSelectedModelConfig(id: string | null): void {
    const selectedConfig = this.teslaModelOptionsSubject.value.configs.find(config => config.id + '' === id);

    this.selectedModelConfig = selectedConfig ? {
      config: selectedConfig,
      towHitch: false,
      yoke: false
    } : undefined;
  }

  public setSelectedModelYoke(value: boolean): void {
    if (this.selectedModelConfig)
      this.selectedModelConfig.yoke = value;
  }

  public setSelectedModelTowHitch(value: boolean): void {
    if (this.selectedModelConfig)
      this.selectedModelConfig.towHitch = value;
  }

  public checkAvailableConfigs(): boolean {
    return this.teslaModelOptionsSubject.value.configs.find(config => config.id === this.selectedModelConfig?.config.id) ? true : false;
  }
}
