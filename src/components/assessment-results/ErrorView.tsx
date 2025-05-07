
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ErrorViewProps {
  errorMessage: string;
  onNewAssessment: () => void;
}

const ErrorView = ({ errorMessage, onNewAssessment }: ErrorViewProps) => {
  return (
    <Card className="border-none shadow-lg">
      <CardHeader>
        <CardTitle>Erreur</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-red-500">{errorMessage}</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={onNewAssessment}>Faire une nouvelle évaluation</Button>
      </CardFooter>
    </Card>
  );
};

export default ErrorView;
