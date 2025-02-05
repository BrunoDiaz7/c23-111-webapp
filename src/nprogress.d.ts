declare module 'nprogress' {
    const NProgress: {
      start: () => void;
      done: () => void;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      configure: (options: any) => void;
    };
    export default NProgress;
  }
  