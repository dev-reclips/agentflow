"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { api, type Subscription } from "@/lib/api";

const PLAN_LABELS: Record<string, string> = {
  free: "Free Plan",
  trial: "Free Trial",
  starter: "Starter — $299/mo",
  growth: "Growth — $1,499/mo",
  scale: "Scale — Custom",
};

const STATUS_LABELS: Record<string, string> = {
  trialing: "Trial",
  active: "Active",
  past_due: "Past due",
  canceled: "Canceled",
  incomplete: "Incomplete",
};

export default function BillingPage() {
  const searchParams = useSearchParams();
  const [sub, setSub] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const successMsg = searchParams.get("success") ? "Subscription updated successfully." : null;
  const cancelMsg = searchParams.get("canceled") ? "Checkout canceled — no changes made." : null;

  useEffect(() => {
    api.billing
      .get()
      .then(setSub)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleCheckout(plan: "starter" | "growth") {
    setActionLoading(true);
    setError(null);
    try {
      const { url } = await api.billing.createCheckout(plan);
      window.location.href = url;
    } catch (e: unknown) {
      setError((e as Error).message);
      setActionLoading(false);
    }
  }

  async function handlePortal() {
    setActionLoading(true);
    setError(null);
    try {
      const { url } = await api.billing.createPortal();
      window.location.href = url;
    } catch (e: unknown) {
      setError((e as Error).message);
      setActionLoading(false);
    }
  }

  if (loading) {
    return <div className="p-8 text-gray-400">Loading…</div>;
  }

  const isActive = sub && (sub.status === "active" || sub.status === "trialing");

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-semibold mb-6">Billing</h1>

      {successMsg && (
        <div className="mb-4 rounded border border-green-600 bg-green-900/30 px-4 py-3 text-sm text-green-400">
          {successMsg}
        </div>
      )}
      {cancelMsg && (
        <div className="mb-4 rounded border border-yellow-600 bg-yellow-900/30 px-4 py-3 text-sm text-yellow-400">
          {cancelMsg}
        </div>
      )}
      {error && (
        <div className="mb-4 rounded border border-red-600 bg-red-900/30 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {sub ? (
        <div className="mb-8 rounded-lg border border-gray-700 bg-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">Current plan</p>
              <p className="text-lg font-semibold">{PLAN_LABELS[sub.plan] ?? sub.plan}</p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                sub.status === "active"
                  ? "bg-green-900 text-green-300"
                  : sub.status === "trialing"
                  ? "bg-blue-900 text-blue-300"
                  : sub.status === "past_due"
                  ? "bg-yellow-900 text-yellow-300"
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              {STATUS_LABELS[sub.status] ?? sub.status}
            </span>
          </div>

          {sub.currentPeriodEnd && (
            <p className="text-sm text-gray-400">
              {sub.cancelAtPeriodEnd ? "Cancels" : "Renews"} on{" "}
              {new Date(sub.currentPeriodEnd).toLocaleDateString()}
            </p>
          )}

          {isActive && sub.plan !== "free" && (
            <button
              onClick={handlePortal}
              disabled={actionLoading}
              className="mt-4 rounded-md bg-gray-700 px-4 py-2 text-sm font-medium hover:bg-gray-600 disabled:opacity-50"
            >
              {actionLoading ? "Redirecting…" : "Manage subscription"}
            </button>
          )}
        </div>
      ) : (
        <div className="mb-8 rounded-lg border border-gray-700 bg-gray-800 p-6">
          <p className="text-sm text-gray-400">No active subscription. Choose a plan below to get started.</p>
        </div>
      )}

      {(!sub || sub.plan === "free" || sub.status === "trialing" || sub.status === "canceled") && (
        <div>
          <h2 className="text-lg font-medium mb-4">
            {sub?.plan === "free" ? "Upgrade to unlock more" : "Upgrade your plan"}
          </h2>
          {sub?.plan === "free" && (
            <div className="mb-4 rounded border border-yellow-700 bg-yellow-900/20 px-4 py-3 text-sm text-yellow-300">
              You&apos;re on the Free plan (1 agent, 5 issues/month). Upgrade to remove limits.
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-indigo-700 bg-gray-800 p-6">
              <h3 className="font-semibold mb-1">Starter</h3>
              <p className="text-2xl font-bold mb-1">$299<span className="text-sm font-normal text-gray-400">/mo</span></p>
              <p className="text-sm text-gray-400 mb-4">3 agents · unlimited issues · 14-day free trial</p>
              <button
                onClick={() => handleCheckout("starter")}
                disabled={actionLoading}
                className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium hover:bg-indigo-500 disabled:opacity-50"
              >
                {actionLoading ? "Redirecting…" : "Upgrade to Starter →"}
              </button>
            </div>

            <div className="rounded-lg border border-gray-700 bg-gray-800 p-6">
              <h3 className="font-semibold mb-1">Growth</h3>
              <p className="text-2xl font-bold mb-1">$1,499<span className="text-sm font-normal text-gray-400">/mo</span></p>
              <p className="text-sm text-gray-400 mb-4">10 agents · priority support · 14-day free trial</p>
              <button
                onClick={() => handleCheckout("growth")}
                disabled={actionLoading}
                className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium hover:bg-indigo-500 disabled:opacity-50"
              >
                {actionLoading ? "Redirecting…" : "Upgrade to Growth →"}
              </button>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-400">
            Need more scale?{" "}
            <a href="mailto:hello@paperclip.ing" className="text-indigo-400 underline">
              Contact us
            </a>{" "}
            for custom pricing.
          </p>
        </div>
      )}
    </div>
  );
}
