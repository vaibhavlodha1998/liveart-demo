import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";

interface Props {
  pageTitle: string;
  linkPath: string;
}

function CustomListItem({ pageTitle, linkPath }: Props) {
  return (
    <Link href={linkPath}>
      <List
        sx={{
          bgcolor: "background.paper",
          width: "100%",
          padding: 0,
        }}
      >
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText
              primary={`Click here to goto ${pageTitle}`}
              sx={{ textAlign: "center" }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Link>
  );
}

export default CustomListItem;
