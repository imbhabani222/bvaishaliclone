import { Card, Col, Row, Skeleton } from "antd";
import React from "react";

function CartSkeleton() {
  return (
    <div
      style={{
        width: "90%",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Row style={{ marginTop: "10px" }}>
        <Skeleton.Button
          style={{ backgroundColor: "#f5f5f5f5", opacity: 0.4 }}
          active={true}
          block={true}
        />
        <Skeleton.Button
          style={{ backgroundColor: "#f5f5f5f5", opacity: 0.4 }}
          active={true}
          block={true}
        />
      </Row>
      <div style={{ opacity: 0 }}>.</div>
      <Row gutter={[12, 12]}>
        <Col xl={18} lg={18} md={18} sm={24} xs={24}>
          <Skeleton.Button
            style={{ backgroundColor: "#f5f5f5f5", opacity: 0.4 }}
            active={true}
            block={true}
          />
          <Skeleton.Button
            style={{ backgroundColor: "#f5f5f5f5", opacity: 0.4 }}
            active={true}
            block={true}
          />
          <Skeleton.Button
            style={{ backgroundColor: "#f5f5f5f5", opacity: 0.4 }}
            active={true}
            block={true}
          />
          <div style={{ opacity: 0 }}>.</div>
          <Skeleton.Button
            style={{ backgroundColor: "#f5f5f5f5", opacity: 0.4 }}
            active={true}
            block={true}
          />
          <Skeleton.Button
            style={{ backgroundColor: "#f5f5f5f5", opacity: 0.4 }}
            active={true}
            block={true}
          />
          <Skeleton.Button
            style={{ backgroundColor: "#f5f5f5f5", opacity: 0.4 }}
            active={true}
            block={true}
          />
          <div style={{ opacity: 0 }}>.</div>
          <Skeleton.Button
            style={{ backgroundColor: "#f5f5f5f5", opacity: 0.4 }}
            active={true}
            block={true}
          />
          <Skeleton.Button
            style={{ backgroundColor: "#f5f5f5f5", opacity: 0.4 }}
            active={true}
            block={true}
          />
          <Skeleton.Button
            style={{ backgroundColor: "#f5f5f5f5", opacity: 0.4 }}
            active={true}
            block={true}
          />
          <div style={{ opacity: 0 }}>.</div>
          <Skeleton.Button
            style={{ backgroundColor: "#f5f5f5f5", opacity: 0.4 }}
            active={true}
            block={true}
          />
          <Skeleton.Button
            style={{ backgroundColor: "#f5f5f5f5", opacity: 0.4 }}
            active={true}
            block={true}
          />
          <Skeleton.Button
            style={{ backgroundColor: "#f5f5f5f5", opacity: 0.4 }}
            active={true}
            block={true}
          />
        </Col>
        <Col xl={6} lg={6} md={6} sm={24} xs={24}>
          <Skeleton.Button
            style={{ backgroundColor: "#f5f5f5f5", opacity: 0.4 }}
            active={true}
            block={true}
          />
          <Skeleton.Button
            style={{ backgroundColor: "#f5f5f5f5", opacity: 0.4 }}
            active={true}
            block={true}
          />
          <Skeleton.Button
            style={{ backgroundColor: "#f5f5f5f5", opacity: 0.4 }}
            active={true}
            block={true}
          />
          <Skeleton.Button
            style={{ backgroundColor: "#f5f5f5f5", opacity: 0.4 }}
            active={true}
            block={true}
          />
          <Skeleton.Button
            style={{ backgroundColor: "#f5f5f5f5", opacity: 0.4 }}
            active={true}
            block={true}
          />
          <Skeleton.Button
            style={{ backgroundColor: "#f5f5f5f5", opacity: 0.4 }}
            active={true}
            block={true}
          />
          <Skeleton.Button
            style={{ backgroundColor: "#f5f5f5f5", opacity: 0.4 }}
            active={true}
            block={true}
          />
          <Skeleton.Button
            style={{ backgroundColor: "#f5f5f5f5", opacity: 0.4 }}
            active={true}
            block={true}
          />
          <Skeleton.Button
            style={{ backgroundColor: "#f5f5f5f5", opacity: 0.4 }}
            active={true}
            block={true}
          />
          <Skeleton.Button
            style={{ backgroundColor: "#f5f5f5f5", opacity: 0.4 }}
            active={true}
            block={true}
          />
          <Skeleton.Button
            style={{ backgroundColor: "#f5f5f5f5", opacity: 0.4 }}
            active={true}
            block={true}
          />
          <Skeleton.Button
            style={{ backgroundColor: "#f5f5f5f5", opacity: 0.4 }}
            active={true}
            block={true}
          />
          <Skeleton.Button
            style={{ backgroundColor: "#f5f5f5f5", opacity: 0.4 }}
            active={true}
            block={true}
          />
          <Skeleton.Button
            style={{ backgroundColor: "#f5f5f5f5", opacity: 0.4 }}
            active={true}
            block={true}
          />
        </Col>
      </Row>
    </div>
  );
}

export default CartSkeleton;
