"use client";

import { ThemeToggle } from "../_components/shared/ThemeToggle";

export default function ConfigPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-md p-6 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-opacity-10 border-[var(--color-text)]">
        <h1 className="text-xl font-bold mb-4 font-[var(--font-display)]">Configuración de Lote</h1>

        <div className="flex items-center justify-between p-3 rounded-[var(--radius-input)] bg-[var(--color-bg)] bg-opacity-50">
          <div>
            <p className="font-medium text-sm">Apariencia</p>
            <p className="text-xs text-[var(--color-text-secondary)]">Alternar entre modo claro y oscuro</p>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </main>
  );
}