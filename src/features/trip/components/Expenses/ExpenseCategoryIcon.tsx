import React from "react";

import { Box, ButtonBase } from "@mui/material";

import { ExpenseCategory } from "@features/trip/types";

interface Props {
  onClick?: () => void;
  children: React.ReactNode;
  color: string;
  backgroundColor: string;
  borderColor: string;
  category: ExpenseCategory;
  isSmall?: boolean;
}

export default function ExpenseCategoryIcon({
  onClick,
  children,
  color,
  backgroundColor,
  borderColor,
  category,
  isSmall,
}: Props) {
  return (
    <Box
      aria-label={`${category}icon`}
      component={onClick ? ButtonBase : Box}
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: isSmall ? 40 : 75,
        height: isSmall ? 40 : 75,
        color,
        backgroundColor,
        borderRadius: 1,
        border: onClick ? 3 : 0,
        borderColor,
      }}
    >
      {children}
    </Box>
  );
}
