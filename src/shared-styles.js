import {
    css
} from 'lit-element'

export const sharedStyles = css `

    
    /* Utilities */
    /* Las utilidades deben llevar important según ITCSS para elevar la especificidad al nivel maximo */ 

    .margin-top--sm{
        margin-top: var(--space-sm)!important;
    }

    .margin-bottom--sm{
        margin-bottom: var(--space-sm)!important;
    }

    .margin-left--sm{
        margin-left: var(--space-sm)!important;
    }

    .margin-right--sm{
        margin-right: var(--space-sm)!important;
    }
`