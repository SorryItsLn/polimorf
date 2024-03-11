import {TemplateRef} from '@angular/core';
import {PolymorpheusComponent} from '../classes/component';
import {PolymorpheusTemplate} from '../directives/template';
import {PolymorpheusHandler} from './handler';
import {PolymorpheusPrimitive} from './primitive';

/**
 * All content types supported by {@link PolymorpheusOutletDirective}
 */
export type PolymorpheusContent<C extends object = {}> =
    | TemplateRef<C>
    | PolymorpheusTemplate<C>
    | PolymorpheusComponent<object, C>
    | PolymorpheusHandler<C>
    | PolymorpheusPrimitive;
