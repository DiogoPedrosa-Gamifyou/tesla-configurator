import { Injectable } from '@angular/core';
import { Observable, of, map, catchError, BehaviorSubject } from 'rxjs';
import { Model, ModelColor } from '../../_models/models.model';
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

  private selectedTeslaModel: Model | undefined;
  private selectedTeslaModelColor: ModelColor | undefined;

  constructor(
    private apiService: ApiService
  ) {
    this.stepsSubject.next([
      {
        id: 'step1',
        text: 'Step 1',
        valid: true
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

  public get steps(): Array<Step> {
    return this.stepsSubject.value;
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
