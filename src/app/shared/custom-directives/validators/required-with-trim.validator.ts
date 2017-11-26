import { FormControl } from '@angular/forms';

// requiredWithTrim
export function RequiredWithTrimValidator(formControl: FormControl) {
if(formControl.value == undefined || formControl.value.trim() == '')
  return { requiredWithTrim: {valid: false} };
else
  return null;
}