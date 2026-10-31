import { useMemo, useState } from "react";
import { ArrowRight, BookOpenText, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { allStyles } from "@/lib/store";

const fmtRange = (value: [number, number], digits = 3) => {
  const format = (n: number) => Number(n).toFixed(digits).replace(/0+$/, "").replace(/\.$/, "");
  return `${format(value[0])}–${format(value[1])}`;
};

export default function StylesPage() {
  const [search, setSearch] = useState("");
  const styles = useMemo(() => allStyles(), []);
  const normalized = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const filtered = styles.filter(style => normalized(`${style.code} ${style.name}`).includes(normalized(search)));

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BookOpenText className="h-7 w-7 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Estilos</h1>
            <p className="text-muted-foreground">BJCP 2021 + estilos personalizados</p>
          </div>
        </div>
      </header>

      <div className="rounded-xl border border-border bg-card p-3 shadow-foam">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            aria-label="Buscar estilo"
            placeholder="Pesquisar detalhadamente no guia de estilos..."
            className="pl-9"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-foam">
        {filtered.length === 0 ? (
          <div className="p-6 text-sm text-muted-foreground">Nenhum estilo encontrado.</div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map(style => (
              <Link key={`${style.code}-${style.name}`} to={`/styles/${encodeURIComponent(style.code)}`} className="block">
                <div className="flex items-center justify-between gap-4 p-4 sm:p-5 hover:bg-muted/30 transition-colors">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-lg font-semibold text-foreground">{style.name}</span>
                        <span className="rounded bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                          {style.code}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {style.code.startsWith("custom-") ? "Estilo personalizado" : "BJCP 2021"}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
                        <span className="rounded border border-border bg-background px-2 py-1">OG {fmtRange(style.og, 3)}</span>
                        <span className="rounded border border-border bg-background px-2 py-1">FG {fmtRange(style.fg, 3)}</span>
                        <span className="rounded border border-border bg-background px-2 py-1">IBU {fmtRange(style.ibu, 0)}</span>
                        <span className="rounded border border-border bg-background px-2 py-1">SRM {fmtRange(style.srm, 0)}</span>
                        <span className="rounded border border-border bg-background px-2 py-1">ABV {fmtRange(style.abv, 1)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
