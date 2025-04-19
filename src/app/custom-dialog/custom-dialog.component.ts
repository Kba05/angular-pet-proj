import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { TuiButton, TuiDialogContext, TuiTextfield } from '@taiga-ui/core';
import { TuiAutoFocus } from '@taiga-ui/cdk';
import { TuiInputModule,  TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { TuiFieldErrorPipe, TuiInputNumber, tuiValidationErrorsProvider,TuiCheckbox } from '@taiga-ui/kit';
import { TuiError } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';

import {v4 as uuidv4} from 'uuid';
import { HousingLocation } from '../housinglocation';

@Component({
    standalone: true,
    imports: [
        AsyncPipe,
        FormsModule,
        TuiAutoFocus,
        TuiButton,
        TuiInputModule,
        TuiTextfieldControllerModule,
        TuiError,
        TuiFieldErrorPipe,
        TuiInputNumber,
        TuiTextfield,
        TuiCheckbox,
        ReactiveFormsModule,
    ],
    templateUrl: './custom-dialog.template.html',
    styleUrl: './custom-dialog.style.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        tuiValidationErrorsProvider({
            required: 'Required field',
            pattern: 'Invalid format',
            max: 'Cannot be more than 10',
        }),
    ],
})
export class CustomDialog {
    public readonly context = injectContext<TuiDialogContext<HousingLocation, null>>();

    protected addHousingForm = new FormGroup({
        name: new FormControl<string | null>(null, Validators.required),
        city: new FormControl<string | null>(
            null,
            [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]
        ),
        state: new FormControl<string | null>(null),
        photo: new FormControl<string | null>(
            null,
            Validators.pattern(/(http[s]?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))/i)
        ),
        availableUnits: new FormControl<number>(0, Validators.max(10)),
        wifi: new FormControl<boolean>(false),
        laundry: new FormControl<boolean>(false),
        coordinates: new FormControl<string | null>(null, Validators.required),
    });

    protected get hasValue(): boolean {
        return this.addHousingForm.valid
    }

    protected submit(): void {
        const formData = this.addHousingForm.value
        const cleanedFormData: HousingLocation = {
            id: uuidv4(),
            name: formData.name ?? '',
            city: formData.city ?? '',
            state: formData.state ?? '',
            photo: formData.photo ?? '',
            availableUnits: formData.availableUnits ?? 0,
            wifi: formData.wifi ?? false,
            laundry: formData.laundry ?? false,
            coordinates: formData.coordinates ?? ''
        }
        this.context.completeWith(cleanedFormData)

        alert('Дом успешно добавлен!')
        
        this.addHousingForm.reset()
    }
}