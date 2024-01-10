import { Injectable } from '@angular/core';
import { Observable, of, map, catchError, BehaviorSubject } from 'rxjs';
import { Model, ModelColor, ModelOptions } from '../../_models/models.model';
import { ApiService } from '../api/api.service';
import { Step } from '../../_models/steps.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private stepsSubject: BehaviorSubject<Array<Step>> = new BehaviorSubject<Array<Step>>([]);
  public steps$: Observable<Array<Step>> = this.stepsSubject.asObservable();

  private teslaModelsSubject: BehaviorSubject<Array<Model>> = new BehaviorSubject<Array<Model>>([]);
  public teslaModels$: Observable<Array<Model>> = this.teslaModelsSubject.asObservable();

  private teslaModelOptionsSubject: BehaviorSubject<Array<ModelOptions>> = new BehaviorSubject<Array<ModelOptions>>([]);
  public teslaModelOptions$: Observable<Array<ModelOptions>> = this.teslaModelOptionsSubject.asObservable();

  private selectedTeslaModel: Model | undefined;
  private selectedTeslaModelColor: ModelColor | undefined;

  constructor(
    private apiService: ApiService
  ) {
    this.stepsSubject.next([
      {
        id: 'step1',
        text: 'Step 1',
        valid: false
      },
      {
        id: 'step2',
        text: 'Step 2',
        valid: false
      },
      {
        id: 'step3',
        text: 'Step 3',
        valid: false
      }
    ]);
  }

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

  public get steps(): Array<Step> {
    return this.stepsSubject.value;
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
    this.selectedTeslaModelColor = this.selectedTeslaModel?.colors.find(color => color.code === selectedCode);
  }

  public checkStepValidity(stepIndex: number): boolean {
    debugger;
    return this.steps[stepIndex - 1 > 0 ? stepIndex - 1: stepIndex].valid;
  }
}
