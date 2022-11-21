import { createStore } from '@reduxjs/toolkit';
import rootReducer from './OverlayReducer';

const appReducer = createStore(rootReducer);
export default appReducer;
