import React from 'react';
import './PropertyPanel.css';

export interface PropertyControl {
  name: string;
  label: string;
  type: 'text' | 'select' | 'boolean' | 'number' | 'color';
  value: any;
  options?: { label: string; value: any }[];
  onChange: (value: any) => void;
}

interface PropertyPanelProps {
  title: string;
  controls: PropertyControl[];
  className?: string;
}

const PropertyPanel: React.FC<PropertyPanelProps> = ({ title, controls, className = '' }) => {
  const renderControl = (control: PropertyControl) => {
    switch (control.type) {
      case 'boolean':
        return (
          <label className="property-control">
            <span className="property-control__label">{control.label}</span>
            <input
              type="checkbox"
              checked={control.value}
              onChange={(e) => control.onChange(e.target.checked)}
              className="property-control__input"
            />
          </label>
        );

      case 'select':
        return (
          <label className="property-control">
            <span className="property-control__label">{control.label}</span>
            <select
              value={control.value}
              onChange={(e) => control.onChange(e.target.value)}
              className="property-control__input"
            >
              {control.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        );

      case 'number':
        return (
          <label className="property-control">
            <span className="property-control__label">{control.label}</span>
            <input
              type="number"
              value={control.value}
              onChange={(e) => control.onChange(Number(e.target.value))}
              className="property-control__input"
            />
          </label>
        );

      case 'color':
        return (
          <label className="property-control">
            <span className="property-control__label">{control.label}</span>
            <div className="property-control__color-wrapper">
              <input
                type="color"
                value={control.value}
                onChange={(e) => control.onChange(e.target.value)}
                className="property-control__color"
              />
              <input
                type="text"
                value={control.value}
                onChange={(e) => control.onChange(e.target.value)}
                className="property-control__input"
              />
            </div>
          </label>
        );

      case 'text':
      default:
        return (
          <label className="property-control">
            <span className="property-control__label">{control.label}</span>
            <input
              type="text"
              value={control.value}
              onChange={(e) => control.onChange(e.target.value)}
              className="property-control__input"
            />
          </label>
        );
    }
  };

  return (
    <aside className={`property-panel ${className}`}>
      <div className="property-panel__header">
        <h3>{title}</h3>
      </div>
      <div className="property-panel__content">
        {controls.map((control) => (
          <div key={control.name}>{renderControl(control)}</div>
        ))}
      </div>
    </aside>
  );
};

export default PropertyPanel;

