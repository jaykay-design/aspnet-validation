/**
 * A simple IDictionary<string, string>
 */
export interface StringKeyValuePair {
    [key: string]: string;
}
/**
 * Parameters passed into validation providers from the element attributes.
 * error property is read from data-val-[Provider Name] attribute.
 * params property is populated from data-val-[Provider Name]-[Parameter Name] attributes.
 */
export interface ValidationDirectiveBindings {
    error: string;
    params: StringKeyValuePair;
}
/**
 * A key-value pair describing what validations to enforce to an input element, with respective parameters.
 */
export type ValidationDirective = {
    [key: string]: ValidationDirectiveBindings;
};
/**
 * Validation plugin signature with multitype return.
 * Boolean return signifies the validation result, which uses the default validation error message read from the element attribute.
 * String return signifies failed validation, which then will be used as the validation error message.
 * Promise return signifies asynchronous plugin behavior, with same behavior as Boolean or String.
 */
export type ValidationProvider = (value: string, element: HTMLInputElement, params: StringKeyValuePair) => boolean | string | Promise<boolean | string>;
/**
 * Contains default implementations for ASP.NET Core MVC validation attributes.
 */
export declare class MvcValidationProviders {
    /**
     * Validates whether the input has a value.
     */
    required: ValidationProvider;
    /**
     * Validates whether the input value satisfies the length contstraint.
     */
    stringLength: ValidationProvider;
    /**
     * Validates whether the input value is equal to another input value.
     */
    compare: ValidationProvider;
    /**
     * Validates whether the input value is a number within a given range.
     */
    range: ValidationProvider;
    /**
     * Validates whether the input value satisfies a regular expression pattern.
     */
    regex: ValidationProvider;
    /**
     * Validates whether the input value is an email in accordance to RFC822 specification, with a top level domain.
     */
    email: ValidationProvider;
    /**
     * Validates whether the input value is a credit card number, with Luhn's Algorithm.
     */
    creditcard: ValidationProvider;
    /**
     * Validates whether the input value is a URL.
     */
    url: ValidationProvider;
    /**
     * Validates whether the input value is a phone number.
     */
    phone: ValidationProvider;
    /**
     * Asynchronously validates the input value to a JSON GET API endpoint.
     */
    remote: ValidationProvider;
}
/**
 * Responsibles for managing the DOM elements and running the validation providers.
 */
export declare class ValidationService {
    /**
     * A key-value collection of loaded validation plugins.
     */
    private providers;
    /**
     * A key-value collection of <span> elements for displaying validation messages for an input (by DOM ID).
     */
    private messageFor;
    /**
     * A list of managed elements, each having a randomly assigned unique identifier (UID).
     */
    private elementUIDs;
    /**
     * A key-value collection of UID to Element for quick lookup.
     */
    private elementByUID;
    /**
     * A key-value collection of input UIDs for a <form> UID.
     */
    private formInputs;
    /**
     * A key-value map for input UID to its validator factory.
     */
    private validators;
    /**
     * A key-value map for element UID to its trigger element (submit event for <form>, input event for <textarea> and <input>).
     */
    private elementEvents;
    /**
     * A key-value map of input UID to its validation error message.
     */
    private summary;
    /**
     * A serialized representation of the validation error message summary rendered to the user.
     */
    private renderedSummaryJSON;
    /**
     * In milliseconds, the rate of fire of the input validation.
     */
    debounce: number;
    /**
     * Callback triggered when form is submitted and valid
     * */
    afterValidation: ((form: HTMLFormElement) => void) | undefined;
    /**
     * Registers a new validation plugin of the given name, if not registered yet.
     * Registered plugin validates inputs with data-val-[name] attribute, used as error message.
     * @param name
     * @param callback
     */
    addProvider(name: string, callback: ValidationProvider): void;
    /**
     * Registers the default providers for enabling ASP.NET Core MVC client-side validation.
     */
    private addMvcProviders;
    /**
     * Scans document for all validation message <span> generated by ASP.NET Core MVC, then tracks them.
     */
    private scanMessages;
    /**
     * Given attribute map for an HTML input, returns the validation directives to be executed.
     * @param attributes
     */
    parseDirectives(attributes: NamedNodeMap): ValidationDirective;
    /**
     *  Returns an RFC4122 version 4 compliant GUID.
     */
    private guid4;
    /**
     * Gets a UID for an DOM element.
     * @param node
     */
    private getElementUID;
    /**
     * Returns a Promise that returns validation result for each and every inputs within the form.
     * @param formUID
     */
    private getFormValidationTask;
    /**
     * Tracks a <form> element as parent of an input UID. When the form is submitted, attempts to validate the said input asynchronously.
     * @param form
     * @param inputUID
     */
    private trackFormInput;
    /**
     * Adds an input element to be managed and validated by the service.
     * Triggers a debounced live validation when input value changes.
     * @param input
     */
    addInput(input: HTMLInputElement): void;
    /**
     * Removes an input element to be managed and validated by the service.
     * @param input
     */
    removeInput(input: HTMLInputElement): void;
    /**
     * Scans the entire document for input elements to be validated.
     */
    private scanInputs;
    /**
     * Returns a <ul> element as a validation errors summary.
     */
    createSummaryDOM(): HTMLUListElement;
    /**
     * Displays validation summary to ASP.NET Core MVC designated elements, when it actually gets updated.
     */
    private renderSummary;
    /**
     * Adds an error message to an input element, which also updates the validation message elements and validation summary elements.
     * @param input
     * @param message
     */
    addError(input: HTMLInputElement, message: string): void;
    /**
     * Removes an error message from an input element, which also updates the validation message elements and validation summary elements.
     * @param input
     */
    removeError(input: HTMLInputElement): void;
    /**
     *
     * @param input Validates a single input element
     * @returns true on valid
     */
    validateElement(input: HTMLInputElement): Promise<boolean>;
    /**
     * Returns a validation Promise factory for an input element, using given validation directives.
     * @param input
     * @param directives
     */
    createValidator(input: HTMLInputElement, directives: ValidationDirective): () => Promise<boolean>;
    /**
     * Load default validation providers and scans the entire document when ready.
     */
    bootstrap(): void;
}
