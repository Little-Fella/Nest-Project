// src/types/model-viewer.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        src?: string;
        alt?: string;
        "camera-controls"?: boolean;
        exposure?: string;
        "auto-rotate"?: boolean;
        "shadow-intensity"?: string;
        "interaction-prompt"?: string;
        bounds?: string;
      },
      HTMLElement
    >;
  }
}
