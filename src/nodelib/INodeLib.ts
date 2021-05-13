export default interface INodeLib {
    test: () => void;
    isDev: () => boolean;
}

declare global {
    interface Window {
        nodelib: INodeLib;
    }
}
