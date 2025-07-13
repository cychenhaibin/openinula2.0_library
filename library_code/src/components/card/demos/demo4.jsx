import { Card, CardGrid } from "../index.jsx";

const CardDemo = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <Card title="Card Grid" gridbox>
          <CardGrid
            style={{
              width: "25%",
              textAlign: "center",
            }}
          >
            Content
          </CardGrid>
          <CardGrid
            hoverable={false}
            style={{
              width: "25%",
              textAlign: "center",
            }}
          >
            Content
          </CardGrid>
          <CardGrid
            style={{
              width: "25%",
              textAlign: "center",
            }}
          >
            Content
          </CardGrid>
          <CardGrid
            style={{
              width: "25%",
              textAlign: "center",
            }}
          >
            Content
          </CardGrid>
          <CardGrid
            style={{
              width: "25%",
              textAlign: "center",
            }}
          >
            Content
          </CardGrid>
          <CardGrid
            style={{
              width: "25%",
              textAlign: "center",
            }}
          >
            Content
          </CardGrid>
          <CardGrid
            style={{
              width: "25%",
              textAlign: "center",
            }}
          >
            Content
          </CardGrid>
        </Card>
      </div>
    </div>
  );
};

export default CardDemo;
