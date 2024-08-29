import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";

function App() {
  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <section>
        <h1 className="text-4xl font-bold mb-4">SQL to Java Entity Generator</h1>
        <p className="text-lg text-muted-foreground">
          A command-line tool that generates Java entity classes from SQL table definitions, simplifying database integration in Java applications.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Configuration</h2>
        <Card>
          <CardHeader>
            <CardTitle>YAML Configuration Example</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="font-mono text-sm overflow-x-auto whitespace-pre-wrap break-words">
              <code>{`
version: "1"
sql:
  - engine: "postgresql"                 # Motor de bases de datos(por el momento unico soportado) 
    file: "path/to/your/schema.sql"      # Ruta al archivo de esquema sql
    gen:
      java:
        basePackage: "com.example.demo"  # Ruta base de los paquetes
        entityPackage: "entity"          # Ruta base donde generar las entidades
        repositoryPackage: "repository"  # Ruta base donde generar los repositorios
        repositoryType: "generic"        # Tipo de repositorio a generar(JpaRepository o Generic)
              `}</code>
            </pre>
            <p className="mt-2 text-muted-foreground">
              Create a `sqlj.yaml` file in your project root with this structure to configure the generator.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="w-full">
        <h2 className="text-2xl font-bold mb-4">Usage</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Initialize Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="font-mono text-sm overflow-x-auto whitespace-pre-wrap break-words bg-gray-100 p-4 rounded">
                <code>sqlj init</code>
              </pre>
              <div className="mt-4 space-y-2">
                <p className="text-muted-foreground">
                  This command initializes the project by generating essential documentation and configuration files.
                </p>
                <p className="font-semibold mt-4">Generated Files:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <code className="font-semibold">sqlj.yaml</code>: A template configuration file
                    <p className="mt-1">This YAML file contains the default configuration settings for the SQL to Java conversion process.</p>
                  </li>
                  <li>
                    <code className="font-semibold">README.md</code>: Comprehensive documentation
                    <p className="mt-1">This Markdown file provides detailed instructions on:</p>
                    <ul className="list-circle pl-6 mt-2">
                      <li>How to configure the <code>sqlj.yaml</code> file</li>
                      <li>Available options for repository types</li>
                      <li>Step-by-step guide on using the SQLJ CLI tool</li>
                    </ul>
                  </li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  After running <code>sqlj init</code>, review and edit the <code>sqlj.yaml</code> file to align with your project's specific requirements. This customization is crucial before proceeding to use the <code>generate</code> command for creating Java entities and repositories.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Generate Entities</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="font-mono text-sm overflow-x-auto whitespace-pre-wrap break-words bg-gray-100 p-4 rounded">
                <code>sqlj generate</code>
              </pre>
              <div className="mt-4 space-y-2">
                <p className="text-muted-foreground">
                  Run this command to generate Java entities based on your `sqlj.yaml` configuration. The command performs the following actions:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Reads the `sqlj.yaml` file to determine the configuration settings.</li>
                  <li>Locates and reads the SQL schema file specified in the configuration.</li>
                  <li>Generates Java entity classes based on the SQL schema.</li>
                  <li>Creates necessary package structures as defined in the configuration.</li>
                  <li>Places generated code in the specified output directories.</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Ensure your `sqlj.yaml` file is properly configured with the correct paths for input SQL files and output Java directories before running this command.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>


      <section>
        <h2 className="text-2xl font-bold mb-4">SQL to Java Example</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>SQL Input</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="font-mono text-sm overflow-x-auto whitespace-pre-wrap break-words">
                <code>{`
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(20) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER NOT NULL REFERENCES users(id)
);
                `}</code>
              </pre>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Java Output</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="font-mono text-sm overflow-x-auto whitespace-pre-wrap break-words">
                <code>{`
// Users.java
package com.example.demo.entity;

import java.sql.Timestamp;

public class Users {
    private Integer id;
    private String username;
    private String email;
    private Timestamp createdAt;

    // Constructors, getters, and setters
}

// Orders.java
package com.example.demo.entity;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class Orders {
    private Integer id;
    private String orderNumber;
    private BigDecimal totalAmount;
    private Timestamp orderDate;
    private Users user;

    // Constructors, getters, and setters
}
                `}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="w-full">
        <h2 className="text-3xl font-bold mb-6">Type Mapping</h2>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">SQL to Java Type Mapping</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left font-semibold">SQL Type</th>
                    <th className="border p-2 text-left font-semibold">Java Type</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["SERIAL, INTEGER", "Integer"],
                    ["BIGINT", "Long"],
                    ["VARCHAR, TEXT", "String"],
                    ["BOOLEAN", "Boolean"],
                    ["DATE", "java.sql.Date"],
                    ["TIME", "java.sql.Time"],
                    ["TIMESTAMP", "java.sql.Timestamp"],
                    ["DECIMAL, NUMERIC", "java.math.BigDecimal"],
                    ["REAL, FLOAT4", "Float"],
                    ["DOUBLE PRECISION, FLOAT8", "Double"]
                  ].map(([sqlType, javaType], index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="border p-2">{sqlType}</td>
                      <td className="border p-2"><code>{javaType}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              This table shows how SQL data types are mapped to their corresponding Java types in the generated entities.
              The converter automatically handles these conversions during the code generation process.
            </p>
          </CardContent>
        </Card>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">Available Commands</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Commands</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6">
                <li><code>sqlj init</code> - Creates sqlj.yaml and README.md</li>
                <li><code>sqlj generate</code> - Generates repositories based on sqlj.yaml</li>
                <li><code>sqlj --help</code> - Shows general help</li>
                <li><code>sqlj init --help</code> - Shows specific help for init command</li>
                <li><code>sqlj generate --help</code> - Shows specific help for generate command</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Development Commands</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6">
                <li><code>mvn clean package</code> - Cleans and compiles the project</li>
                <li><code>mvn -Pnative package</code> - Compiles using GraalVM for native executable</li>
                <li><code>mv target/&lt;executable-name&gt; /usr/local/bin/</code> - Moves executable to PATH</li>
                <li><code>rm /usr/local/bin/&lt;executable-name&gt;</code> - Removes executable from PATH</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default App;