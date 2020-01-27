import { action } from 'easy-peasy';

const sidebarModel = {
    visible: false,
    toggle: action(({visible}) => ({visible: !visible})),
    close: action(({visible}) => ({visible: false})),
    open: action(({visible}) => ({visible: true}))
};

export default sidebarModel;
