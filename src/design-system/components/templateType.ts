// import {
//   type ElementType,
//   type ReactElement,
//   forwardRef,
// } from "react";
// import {
//   type PolymorphicComponentPropsWithRef,
//   type PolymorphicRef,
// } from "../../utils/polymorphic";

// type OwnProps = {
//   className?: string;
// };

// type ComponentProps<T extends ElementType> = PolymorphicComponentPropsWithRef<
//   T,
//   OwnProps
// >;

// type ComponentSignature = <T extends ElementType = "div">(
//   props: ComponentProps<T>
// ) => ReactElement | null;

// const ComponentInner = <T extends ElementType = "div">(
//   { as, className, ...rest }: ComponentProps<T>,
//   ref: PolymorphicRef<T>
// ): ReactElement | null => {
//   const Component = as || "div";

//   return <Component ref={ref} className={className} {...rest} />;
// };

// const ComponentBase = forwardRef(ComponentInner as never);
// ComponentBase.displayName = "ComponentName";

// export const Component = ComponentBase as unknown as ComponentSignature;