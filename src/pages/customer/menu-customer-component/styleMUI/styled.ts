import { styled, alpha, InputBase } from "@mui/material";

export const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    // marginRight: theme.spacing(1),
    // marginLeft: theme.spacing(1),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(4),
        width: "auto"
    }
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "white",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 35, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "10ch"
        }
    }
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}));
