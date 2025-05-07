
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface ErrorViewProps {
  errorMessage: string;
  onNewAssessment: () => void;
  onRetry?: () => void;
}

const ErrorView = ({ errorMessage, onNewAssessment, onRetry }: ErrorViewProps) => {
  return (
    <Card className="border-none shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-red-600 gap-2">
          <AlertCircle className="h-6 w-6" />
          Erreur
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-red-500 mb-4">{errorMessage}</p>
        <p className="text-center text-gray-600">
          Notre système d'analyse d'orientation est actuellement indisponible. 
          Veuillez réessayer plus tard ou contacter le support si le problème persiste.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        {onRetry && (
          <Button onClick={onRetry} variant="outline">
            Réessayer
          </Button>
        )}
        <Button onClick={onNewAssessment}>Faire une nouvelle évaluation</Button>
      </CardFooter>
    </Card>
  );
};

export default ErrorView;
