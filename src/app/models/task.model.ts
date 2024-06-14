export interface Task {
    id: any;
    name: any;
    startTime?: any ;
    endTime?: any;
    duration?: any; // in milliseconds
    elapsedTime?: any; // in milliseconds
    history: { startTime: any, endTime?: any, duration?: any }[];
}
  