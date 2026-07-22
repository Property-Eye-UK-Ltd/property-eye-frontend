type Listener = () => void;

const listeners = new Set<Listener>();

export const subscriptionGateEvents = {
    emit: () => {
        listeners.forEach((listener) => listener());
    },
    subscribe: (listener: Listener) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
    },
};
