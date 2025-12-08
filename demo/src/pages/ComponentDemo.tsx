import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getComponentConfig } from '../utils/componentConfigs';
import CodeBlock from '../components/CodeBlock';
import PropertyPanel from '../components/PropertyPanel';
import { ToastProvider } from '../../../src';
import './ComponentDemo.css';

const ComponentDemo: React.FC = () => {
  const { category, component } = useParams<{ category: string; component: string }>();
  const config = category && component ? getComponentConfig(category, component) : null;

  const [props, setProps] = useState<Record<string, any>>({});

  useEffect(() => {
    if (config) {
      setProps({ ...config.defaultProps });
    }
  }, [config]);

  if (!config) {
    // Format component name (e.g., "forminput" -> "FormInput", "searchbar" -> "SearchBar")
    const formatComponentName = (name: string): string => {
      return name
        .split(/(?=[A-Z])|[-_]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
    };
    
    const componentName = component ? formatComponentName(component) : 'Component';
    
    return (
      <div className="component-demo">
        <div className="component-demo__content">
          <div className="component-demo__header">
            <h1 className="component-demo__title">{componentName}</h1>
            <p className="component-demo__description">
              This component demo is coming soon! The component exists in the library but the interactive demo is not yet configured.
            </p>
          </div>
          <div className="component-demo__section">
            <p>
              You can still use this component in your projects by importing it from the library:
            </p>
            <CodeBlock 
              code={`import { ${componentName} } from '@scott/shared-ui-components';`} 
              language="tsx" 
            />
            <p style={{ marginTop: '1rem' }}>
              Check the main library documentation for usage examples and API details.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handlePropsChange = (newProps: Record<string, any>) => {
    setProps(newProps);
  };

  const propertyControls = config.propertyControls(props, handlePropsChange);
  const code = config.generateCode(props);

  return (
    <ToastProvider position="top-right">
      <div className="component-demo">
        <div className="component-demo__content">
          <div className="component-demo__header">
            <h1 className="component-demo__title">{config.name}</h1>
            <p className="component-demo__description">{config.description}</p>
          </div>

          <div className="component-demo__section">
            <h2 className="component-demo__section-title">Live Example</h2>
            <div className="component-demo__preview">
              <div style={{ width: '100%', maxWidth: '600px' }}>
                {config.renderComponent(props, handlePropsChange)}
              </div>
            </div>
          </div>

          <div className="component-demo__section">
            <h2 className="component-demo__section-title">Usage</h2>
            <div className="component-demo__import">
              <CodeBlock code={config.importPath} language="tsx" />
            </div>
            <CodeBlock code={code} language="tsx" />
          </div>

          <div className="component-demo__section">
            <h2 className="component-demo__section-title">Popular Attributes</h2>
            <div className="component-demo__attributes">
              {config.popularAttributes.map((attr) => (
                <div key={attr.name} className="attribute-item">
                  <h3 className="attribute-item__name">{attr.name}</h3>
                  <p className="attribute-item__description">{attr.description}</p>
                  <div className="attribute-item__examples">
                    <strong>Examples:</strong>
                    <ul>
                      {attr.examples.map((example, idx) => (
                        <li key={idx}>
                          <code>{example}</code>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <PropertyPanel title="Properties" controls={propertyControls} />
      </div>
    </ToastProvider>
  );
};

export default ComponentDemo;

