import { Search, ShieldAlert, ShieldCheck } from 'lucide-react'

const products = [
  { name: 'Glow Serum 3000', status: 'flagged', reason: 'Claim needs active concentration proof' },
  { name: 'Organic Whey Pro', status: 'verified', reason: 'Clean label proof uploaded' },
  { name: 'Herbal Hair Growth Oil', status: 'review', reason: 'Seller and batch check pending' },
  { name: 'Daily Multivitamin', status: 'verified', reason: 'Third-party certificate present' },
]

export default function ProductVerifier() {
  return (
    <div className="rounded-[1.5rem] border border-white bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-ink">Product Validator</h2>
        <span className="rounded-full bg-terracotta-soft px-2.5 py-0.5 text-xs font-bold text-terracotta">
          demo
        </span>
      </div>
      <p className="mt-1 text-xs text-ink-faint">
        Claim checks, seller proof, ingredient context
      </p>

      <div className="relative mt-4">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
        />
        <input
          type="text"
          placeholder="Scan a product or paste a link..."
          className="w-full rounded-xl border border-stone-200 bg-cream py-2.5 pl-10 pr-4 text-sm text-ink outline-none transition placeholder:text-ink-faint focus:border-forest/40 focus:ring-2 focus:ring-forest/15"
        />
      </div>

      <ul className="mt-4 space-y-2">
        {products.map((product) => (
          <li key={product.name} className="flex items-center gap-3 rounded-xl bg-cream p-3">
            {product.status === 'verified' ? (
              <ShieldCheck size={18} className="shrink-0 text-forest" />
            ) : product.status === 'flagged' ? (
              <ShieldAlert size={18} className="shrink-0 text-terracotta" />
            ) : (
              <Search size={18} className="shrink-0 text-ink-faint" />
            )}
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-ink">{product.name}</div>
              <div className="truncate text-xs text-ink-faint">{product.reason}</div>
            </div>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                product.status === 'verified'
                  ? 'bg-pale text-forest'
                  : product.status === 'flagged'
                    ? 'bg-terracotta-soft text-terracotta'
                    : 'bg-cream-sand text-ink-faint'
              }`}
            >
              {product.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
