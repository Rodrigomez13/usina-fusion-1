"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PortfoliosTab from "./components/portfolios-tab"
import BusinessManagersTab from "./components/business-managers-tab"
import CampaignsTab from "./components/campaigns-tab"
import AdSetsTab from "./components/ad-sets-tab"
import AdsTab from "./components/ads-tab"
import ApisTab from "./components/apis-tab"
import WalletsTab from "./components/wallets-tab"

export default function PublicidadPage() {
  const [activeTab, setActiveTab] = useState("portfolios")

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Gestión de Publicidad</h1>

      <Tabs defaultValue="portfolios" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-7 mb-6">
          <TabsTrigger value="wallets">Wallets</TabsTrigger>
          <TabsTrigger value="portfolios">Portfolios</TabsTrigger>
          <TabsTrigger value="business-managers">Business Managers</TabsTrigger>
          <TabsTrigger value="campaigns">Campañas</TabsTrigger>
          <TabsTrigger value="ad-sets">Conjuntos de Anuncios</TabsTrigger>
          <TabsTrigger value="ads">Anuncios</TabsTrigger>
          <TabsTrigger value="apis">APIs</TabsTrigger>
        </TabsList>

        <TabsContent value="wallets">
          <WalletsTab />
        </TabsContent>

        <TabsContent value="portfolios">
          <PortfoliosTab />
        </TabsContent>

        <TabsContent value="business-managers">
          <BusinessManagersTab />
        </TabsContent>

        <TabsContent value="campaigns">
          <CampaignsTab />
        </TabsContent>

        <TabsContent value="ad-sets">
          <AdSetsTab />
        </TabsContent>

        <TabsContent value="ads">
          <AdsTab />
        </TabsContent>

        <TabsContent value="apis">
          <ApisTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
