import React, { useState, useEffect } from "react";
import "./Accordion.css";

// Componente para un sub-item del acordeón (segundo nivel)
// Este componente se encarga de llamar a la API
const SubAccordionItem = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    console.log("open: ", isOpen);
  };

  // useEffect para realizar la llamada a la API cuando el sub-item se abre
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // try {
      //   // Reemplaza esta URL con tu endpoint de API real
      //   const response = await fetch(apiEndpoint);
      //   if (!response.ok) {
      //     throw new Error(`HTTP error! status: ${response.status}`);
      //   }
      //   const result = await response.json();
      //   setData(result);
      // } catch (e) {
      //   setError("Error al cargar los datos.");
      // } finally {
      //   setIsLoading(false);
      // }
      try {
        console.log("Hola buenas");
        setData("huevos");
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen && !data) {
      fetchData();
    }
    // }, [isOpen, apiEndpoint, data]); // Las dependencias aseguran que la llamada se haga solo cuando es necesario
  }, [isOpen, data]);

  return (
    <div className="sub-accordion-item">
      <button
        className={`sub-accordion-button ${isOpen ? "" : "collapsed"}`}
        onClick={toggleOpen}
      >
        {title}
      </button>
      <div className={`sub-accordion-collapse ${isOpen ? "show" : ""}`}>
        <div className="sub-accordion-body">
          {isLoading && <p>Cargando datos...</p>}
          {/* {error && <p className="error">{error}</p>} */}
          {data}
          {/* {data && (
            // Renderiza los datos de la API. Adapta esto a la estructura de tu respuesta
            <pre>{JSON.stringify(data, null, 2)}</pre>
          )} */}
        </div>
      </div>
    </div>
  );
};

// Componente para un item del acordeón (primer nivel)
const AccordionItem = ({ title, children, openItem, onToggle }) => {
  const isOpen = openItem === title;

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className={`accordion-button ${isOpen ? "" : "collapsed"}`}
          onClick={() => onToggle(title)}
          aria-expanded={isOpen}
        >
          {title}
        </button>
      </h2>
      <div className={`accordion-collapse ${isOpen ? "show" : ""}`}>
        <div className="accordion-body">{children}</div>
      </div>
    </div>
  );
};

// Componente principal del acordeón
export const Accordion = () => {
  const [openItem, setOpenItem] = useState(null);

  const handleToggle = (title) => {
    setOpenItem(openItem === title ? null : title);
  };

  return (
    <div className="accordion">
      <AccordionItem
        title="Cómo funcionan los pagos, ómo funcionan los pagos, ómo funcionan los pagos ómo funcionan los pagos, ómo funcionan los pagos"
        openItem={openItem}
        onToggle={handleToggle}
      >
        <SubAccordionItem title="¿Cuánto tardan los pagos?" />
        <SubAccordionItem title="¿Cómo funcionan los reembolsos?" />
      </AccordionItem>

      <AccordionItem
        title="Disputas y tarifas"
        openItem={openItem}
        onToggle={handleToggle}
      >
        <SubAccordionItem title="¿Cuánto cuestan las disputas?" />
        <SubAccordionItem title="¿Hay una tarifa por usar Apple Pay o Google Pay?" />
      </AccordionItem>
    </div>
  );
};
