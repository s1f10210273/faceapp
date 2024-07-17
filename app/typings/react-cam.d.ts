// typings/react-cam.d.ts などに保存します
declare module 'react-cam' {
  import { Ref } from 'react';

  export interface CamProps {
    videoWidth?: number;
    videoHeight?: number;
    ref?: Ref<any>; // あるいは必要な型に合わせて調整します
  }

  export const Cam: React.ComponentType<CamProps>;
}
