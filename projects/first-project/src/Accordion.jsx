import React, { useState, useEffect } from "react";
import "./Accordion.css"; // Asumiendo que este archivo CSS existe y contiene los estilos necesarios.

// Componente para un sub-item del acordeón (segundo nivel)
// Este componente se encarga de llamar a la API
const SubAccordionItem = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    // console.log("open: ", isOpen); // Comentario para evitar logs excesivos en producción
  };

  // useEffect para realizar la llamada a la API cuando el sub-item se abre
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulación de una llamada asíncrona a la API
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simula un retraso de red
        setData("¡Datos cargados para: " + title + "!");
      } catch (error) {
        console.error("Error al cargar datos:", error);
        setData("Error al cargar los datos."); // Mensaje de error simple
      } finally {
        setIsLoading(false);
      }
    };

    // La llamada se realiza solo si el sub-item está abierto y aún no se han cargado los datos
    if (isOpen && !data) {
      fetchData();
    }
  }, [isOpen, data, title]); // Añadimos 'title' a las dependencias por si se usa en fetchData

  return (
    <div className="sub-accordion-item">
      <button
        className={`sub-accordion-button ${isOpen ? "" : "collapsed"}`}
        onClick={toggleOpen}
      >
        {title}
      </button>
      <div className={`sub-accordion-collapse ${isOpen ? "show" : ""}`}>
        {/* El div 'sub-accordion-body' ahora se renderiza condicionalmente solo si 'isOpen' es true */}
        {isOpen && (
          <div className="sub-accordion-body">
            {isLoading && <p>Cargando datos...</p>}
            {/* Aquí se mostrarán los datos obtenidos de la API */}
            {!isLoading && data && <p>{data}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

// Componente para un item del acordeón (primer nivel)
// Ahora recibe un array de sub-ítems en lugar de 'children'
const AccordionItem = ({ title, subItems, openItem, onToggle }) => {
  const isOpen = openItem === title;
  console.log("open: ", isOpen);
  const hasSubItem = subItems && subItems.length > 0;
  console.log("hasSubItem", hasSubItem);

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className={`accordion-button ${isOpen ? "" : "collapsed"}`}
          onClick={() => onToggle(title)}
          aria-expanded={isOpen}
        >
          {title}
          {hasSubItem && (
            <span style={{ fontSize: "1.2rem" }}>{isOpen ? "i" : "▼"}</span>
          )}
        </button>
      </h2>

      {hasSubItem && isOpen && (
        <div className={`accordion-collapse ${isOpen ? "show" : ""}`}>
          <div className="accordion-body">
            {/* Mapeamos el array 'subItems' para renderizar los SubAccordionItem */}
            {subItems.map((item, index) => (
              <SubAccordionItem key={index} title={item.title} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Componente principal del acordeón
export const Accordion = () => {
  const [openItem, setOpenItem] = useState(null);

  const handleToggle = (title) => {
    setOpenItem(openItem === title ? null : title);
  };

  // Definimos los datos de los ítems del acordeón en un array de objetos
  const accordionData = [
    {
      title:
        "Cómo funcionan los pagos, ómo funcionan los pagos, ómo funcionan los pagos ómo funcionan los pagos, ómo funcionan los pagos",
      subItems: [
        { title: "¿Cuánto tardan los pagos?" },
        { title: "¿Cómo funcionan los reembolsos?" },
      ],
    },
    {
      title: "Disputas y tarifas",
      subItems: [
        { title: "¿Cuánto cuestan las disputas?" },
        { title: "¿Hay una tarifa por usar Apple Pay o Google Pay?" },
      ],
    },
    {
      title: "Cooperacion",
    },
  ];

  return (
    <div className="accordion">
      {/* Mapeamos el array 'accordionData' para renderizar cada AccordionItem */}
      {accordionData.map((item, index) => (
        <AccordionItem
          key={index} // Es importante usar una key única para cada elemento en una lista
          title={item.title}
          subItems={item.subItems} // Pasamos los sub-ítems como una prop
          openItem={openItem}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
};
