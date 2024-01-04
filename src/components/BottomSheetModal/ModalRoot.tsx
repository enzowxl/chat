import React, { useMemo, forwardRef, ReactNode } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { COLORS } from "../../constants";

export type Ref = BottomSheetModal;

export interface Props {
  children: ReactNode;
  points: any[];
  index: number;
}

const ModalRoot = forwardRef<Ref, Props>((props, ref) => {
  const snapPoints = useMemo(() => props.points, []);

  return (
    <BottomSheetModal
      handleIndicatorStyle={{
        backgroundColor: COLORS.white,
      }}
      backgroundStyle={{ backgroundColor: COLORS.gray_e }}
      style={{
        paddingHorizontal: 15,
        justifyContent: "center",
      }}
      ref={ref}
      index={props.index}
      snapPoints={snapPoints}
    >
      {props.children}
    </BottomSheetModal>
  );
});

export default ModalRoot;
