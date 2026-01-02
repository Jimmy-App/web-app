import { render, screen } from "@testing-library/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

describe("Card", () => {
  it("renders card sections", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Heading</CardTitle>
        </CardHeader>
        <CardContent>Body</CardContent>
      </Card>,
    );

    expect(screen.getByText("Heading")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
  });
});
