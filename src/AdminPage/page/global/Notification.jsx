import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import axios from "axios";
import {
  Drawer,
  Button,
  List,
  ListItem,
  ListItemText,
  Badge,
} from "@mui/material";
import { Margin } from "@mui/icons-material";

const Notification = () => {
  const [orderCount, setOrderCount] = useState(0);
  const [newSellCount, setnewSellCount] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      const status = encodeURIComponent("주문된 상태");
      try {
        const response = await axios.get(
          `http://localhost:3001/member/deliveriesAlam?status=${status}`
        );
        setOrderCount(response.data.length);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    const fetchUnsoldProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/admin/products/unsold"
        );
        console.log("신규판매:", response.data);
        setnewSellCount(response.data.length);
      } catch (error) {
        console.error("Error fetching unsold products", error);
      }
    };

    fetchOrders();
    fetchUnsoldProducts();
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <h3
        style={{
          marginLeft: "30px",
          marginTop: "10px",
          display: "inline-block",
        }}
      >
        알람
      </h3>
      <List>
        <ListItem
          sx={{
            border: 1,
            borderColor: "primary.light",
            bgcolor: "background.paper",
            borderRadius: "10px",
            marginBottom: 2, // 간격 추가
            boxShadow: 1, // 약간의 그림자를 추가하여 입체감을 줌
          }}
        >
          <ListItemText primary={`신규 주문이 ${orderCount}개 있습니다.`} />
        </ListItem>
        <ListItem
          sx={{
            border: 1,
            borderColor: "primary.light",
            bgcolor: "background.paper",
            borderRadius: "10px",
            marginBottom: 2, // 간격 추가
            boxShadow: 1, // 약간의 그림자를 추가하여 입체감을 줌
          }}
        >
          <ListItemText primary={`신규 판매가 ${newSellCount}개 있습니다.`} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <IconButton
        onClick={toggleDrawer(true)}
        // style={{ color: orderCount > 0 ? "red" : "inherit" }}
      >
        <Badge
          color="error"
          variant="dot"
          invisible={orderCount + newSellCount === 0}
        >
          <NotificationsOutlinedIcon
            style={{ color: drawerOpen ? "inherit" : "action" }}
          />
        </Badge>
      </IconButton>
      <Drawer
        anchor="right" // Drawer가 오른쪽에서 열립니다.
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </>
  );
};

export default Notification;
