import React, { useState } from 'react';
import { HelpCircle, X, Ship, FileText, Mic, MessageSquare } from 'lucide-react';

const tutorialSteps = [
  {
    title: "Bienvenido a ReglaMar IA",
    content: "Fechmmar, en colaboración con Comerciandola SPA, se enorgullece en presentar ReglaMar IA, una solución innovadora para todas sus necesidades digitales en el sector marítimo. Este asistente inteligente procesa y analiza documentación marítima para brindarle respuestas precisas y actualizadas.",
    icon: <Ship className="w-8 h-8 text-blue-500 mb-2" />,
    target: "header"
  },
  {
    title: "Gestión de Documentos",
    content: "Sube fácilmente tus documentos PDF con regulaciones marítimas. ReglaMar IA procesará la información y estará listo para responder tus consultas específicas.",
    icon: <FileText className="w-8 h-8 text-blue-500 mb-2" />,
    target: "file-upload"
  },
  {
    title: "Consultas por Voz",
    content: "¿Prefieres hablar? Utiliza el micrófono para realizar consultas por voz. ReglaMar IA transcribirá tu pregunta y te responderá al instante.",
    icon: <Mic className="w-8 h-8 text-blue-500 mb-2" />,
    target: "input-section"
  },
  {
    title: "Asistente Inteligente",
    content: "Realiza preguntas específicas sobre la normativa y obtén respuestas precisas basadas en la documentación proporcionada. ReglaMar IA está aquí para ayudarte.",
    icon: <MessageSquare className="w-8 h-8 text-blue-500 mb-2" />,
    target: "input-section"
  }
];

// Rest of the component remains the same
export function Tutorial() {
  const [isOpen, setIsOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsOpen(false);
      setCurrentStep(0);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        title="Ayuda"
      >
        <HelpCircle className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {tutorialSteps[currentStep].title}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col items-center mb-4">
              {tutorialSteps[currentStep].icon}
            </div>
            
            <p className="text-gray-600 mb-6 text-center">
              {tutorialSteps[currentStep].content}
            </p>
            
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                {tutorialSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentStep ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                {currentStep === tutorialSteps.length - 1 ? 'Comenzar' : 'Siguiente'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}