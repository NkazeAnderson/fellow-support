export function handleSubmitErrorHandler(e: any){
    console.error(e);
}

export function handleAppErrors<T extends (...args: any[]) => any>(func: T): (...args: Parameters<T>) => ReturnType<T> | void {
    return function (...args: Parameters<T>): ReturnType<T> | void {
        try {
            return func(...args);
        } catch (error) {
            console.log(func.name);
            console.log(error);
        }
    }}
