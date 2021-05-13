export function test(): void {
    console.log('test function!');
}

export function isDev(): boolean {
    return process.env.NODE_ENV === 'development' ? true : false;
}
