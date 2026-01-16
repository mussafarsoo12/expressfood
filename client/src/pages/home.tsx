import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  ChevronRight, 
  Star, 
  Flame, 
  Leaf,
  Menu as MenuIcon,
  X,
  ExternalLink,
  Instagram,
  Facebook,
  Utensils
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import heroBg from "@assets/expressfoodbg_1768570146843.png";

import kebabImg from "@assets/generated_images/gourmet_kebab_sandwich_wrap.png";
import tacosImg from "@assets/generated_images/french_tacos_with_cheese_sauce.png";
import durumImg from "@assets/generated_images/durum_kebab_wrap_close_up.png";
import falafelImg from "@assets/generated_images/falafel_pita_with_tahini.png";

const gallery = [
  { img: kebabImg, title: "Kebab" },
  { img: tacosImg, title: "Tacos" },
  { img: durumImg, title: "Durum" },
  { img: falafelImg, title: "Falafel" },
];

const menuCategories = [
  {
    id: "sandwiches",
    name: "🥙 Sandwich",
    items: [
      { name: "Kebab", description: "Pain pita, viande, salade, tomate, oignon, sauce", price: 11.50 },
      { name: "Falafel", description: "Pain pita, falafels, salade, tomate, oignon, sauce", price: 11.00, vegetarian: true },
    ],
    extras: ["Frites dedans (+1 CHF)", "Fromage (+1 CHF)"]
  },
  {
    id: "durum",
    name: "🌯 Durum",
    items: [
      { name: "Kebab", description: "Galette roulée, viande, crudités, sauce", price: 12.00 },
      { name: "Falafel", description: "Galette roulée, falafels, crudités, sauce", price: 11.50, vegetarian: true },
    ]
  },
  {
    id: "box",
    name: "📦 Box",
    items: [
      { name: "Kebab", description: "Viande et frites en boîte avec sauce", price: 11.50 },
      { name: "Falafel", description: "Falafels et frites en boîte avec sauce", price: 11.50, vegetarian: true },
      { name: "Chicken", description: "Poulet et frites en boîte avec sauce", price: 11.50 },
    ]
  },
  {
    id: "menus",
    name: "🍔 Menus",
    items: [
      { name: "Menu Kebab", description: "Sandwich kebab + frites + boisson", price: 18.50 },
      { name: "Menu Falafel", description: "Sandwich falafel + frites + boisson", price: 18.00, vegetarian: true },
    ]
  },
  {
    id: "assiettes",
    name: "🍽️ Assiettes",
    items: [
      { name: "Assiette Kebab", description: "Viande servie à l'assiette avec riz ou frites et salade", price: 17.00 },
      { name: "Assiette Falafel", description: "Falafels servis à l'assiette avec riz ou frites et salade", price: 16.00, vegetarian: true },
    ]
  },
  {
    id: "tacos",
    name: "🌮 Tacos",
    items: [
      { name: "Tacos 1 viande", description: "Tacos français avec sauce fromagère", price: 12.00 },
      { name: "Tacos menu 1 viande", description: "Tacos 1 viande + frites + boisson", price: 18.50 },
    ],
    footer: "Supplément viande : +2 CHF"
  },
  {
    id: "special",
    name: "⭐ Menu spécial",
    items: [
      { name: "Berline Kebab", description: "Notre spécialité gourmande", price: 19.50, popular: true },
    ]
  },
  {
    id: "accompagnements",
    name: "🍟 Accompagnements",
    items: [
      { name: "Portion de frites", description: "Frites croustillantes", price: 6.00 },
      { name: "Canette 33cl", description: "Coca, Fanta, Sprite, etc.", price: 3.00 },
    ]
  }
];

const schedule = [
  { day: "Lundi", location: "Gare de Pully", hours: "10h00 - 14h00", active: true },
  { day: "Mardi", location: "Gymnase de Sévelin", hours: "10h00 - 14h00", active: false },
  { day: "Mercredi", location: "Lieu sera définie plus tard", hours: "À confirmer", active: false },
  { day: "Jeudi", location: "Rte de Lausanne 4, Cugy", hours: "10h00 - 14h00", active: false },
  { day: "Vendredi", location: "Place de la Riponne", hours: "10h00 - 14h00", active: false },
  { day: "Samedi", location: "Fermé", hours: "-", active: false },
  { day: "Dimanche", location: "Fermé", hours: "-", active: false },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const googleMapsUrl = "https://www.google.com/maps/place/Expressfood.VD/data=!4m2!3m1!1s0x0:0xa192672e8b7f04c9?sa=X&ved=1t:2428&ictx=111";

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Flame className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-display font-black text-xl md:text-2xl uppercase tracking-tighter">
                <span className="text-foreground">Express</span>
                <span className="text-primary ml-1">FOOD</span>
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {["menu", "galerie", "apropos", "emplacements"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors capitalize"
                  data-testid={`nav-${item}`}
                >
                  {item === "galerie" ? "Galerie" : item === "apropos" ? "À propos" : item}
                </button>
              ))}
              <div className="flex gap-2">
                <Button 
                  asChild
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  <a href="tel:0797118555">Appeler</a>
                </Button>
                <Button 
                  asChild
                  className="bg-primary hover:bg-primary/90"
                >
                  <a href="mailto:expressfoodvd@gmail.com">Contactez-nous</a>
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-background border-b border-border"
          >
            <div className="px-4 py-4 space-y-3">
              {["menu", "apropos", "emplacements"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left py-2 text-foreground font-bold capitalize"
                  data-testid={`mobile-nav-${item}`}
                >
                  {item === "apropos" ? "À propos" : item}
                </button>
              ))}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Button asChild variant="outline" className="w-full border-primary text-primary">
                  <a href="tel:0797118555">Appeler</a>
                </Button>
                <Button asChild className="w-full bg-primary">
                  <a href="mailto:expressfoodvd@gmail.com">Contact</a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center pt-16 md:pt-20">
        <div className="absolute inset-0">
          <img 
            src={heroBg} 
            alt="Express FOOD Food Truck" 
            className="w-full h-full object-cover blur-[2px]"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-green-600 text-white rounded-full font-bold shadow-lg">
              <Star className="w-4 h-4 fill-white" />
              100% HALAL
            </div>
            <h1 className="font-display text-5xl sm:text-6xl md:text-8xl font-black text-white leading-none mb-6 tracking-tighter uppercase flex gap-4 md:justify-between items-start">
              <span>Express</span>
              <span className="text-primary drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">FOOD</span>
            </h1>
            <p className="text-xl md:text-2xl text-white font-medium mb-8 max-w-lg drop-shadow-md">
              Le meilleur de la street food à Lausanne et environs. Frais, rapide et savoureux !
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-lg px-8 font-bold h-14"
                onClick={() => scrollToSection("menu")}
                data-testid="hero-voir-menu"
              >
                Voir le Menu
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 border-white/40 text-white hover:bg-white/20 text-lg h-14 font-bold backdrop-blur-sm"
                onClick={() => scrollToSection("emplacements")}
                data-testid="hero-nous-trouver"
              >
                <MapPin className="mr-2 w-5 h-5" />
                Nous Trouver
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galerie" className="py-16 md:py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-primary text-primary-foreground font-bold">GALERIE</Badge>
            <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter">Nos Spécialités</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg"
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-black text-xl uppercase italic">{item.title}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-primary text-primary-foreground px-4 py-1 font-bold">NOTRE CARTE</Badge>
            <h2 className="font-display text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">Menu Express FOOD</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto font-medium">
              Des produits de qualité, servis avec rapidité.
            </p>
          </motion.div>

          <Tabs defaultValue="sandwiches" className="w-full">
            <TabsList className="w-full h-auto flex flex-wrap justify-start gap-2 mb-8 bg-muted/50 p-2 rounded-xl">
              {menuCategories.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="flex-[1_0_28%] md:flex-initial px-4 py-3 font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all text-sm md:text-base"
                  data-testid={`menu-tab-${cat.id}`}
                >
                  {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {menuCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="grid md:grid-cols-2 gap-4">
                  {category.items.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="hover:shadow-xl transition-all group border-2 border-transparent hover:border-primary/30 overflow-hidden">
                        <CardContent className="p-6 flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-display text-xl font-bold group-hover:text-primary transition-colors uppercase italic">
                                {item.name}
                              </h3>
                              {(item as any).popular && (
                                <Badge className="bg-primary/10 text-primary border-primary/20 text-xs font-bold">
                                  BEST
                                </Badge>
                              )}
                              {(item as any).vegetarian && (
                                <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs font-bold">
                                  VÉGÉ
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground font-medium">{item.description}</p>
                          </div>
                          <div className="text-right">
                            <span className="font-display text-2xl font-black text-primary italic">
                              {item.price.toFixed(2)} <span className="text-sm">CHF</span>
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                {category.extras && (
                  <div className="mt-6 p-4 bg-muted/30 rounded-xl border border-dashed border-muted-foreground/30">
                    <p className="font-bold text-sm mb-2 uppercase">Suppléments :</p>
                    <div className="flex flex-wrap gap-4">
                      {category.extras.map(extra => (
                        <span key={extra} className="text-sm font-medium flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" /> {extra}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {category.footer && (
                  <p className="mt-4 font-bold text-primary italic uppercase">{category.footer}</p>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* About Section */}
      <section id="apropos" className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-primary text-primary-foreground font-bold">NOTRE HISTOIRE</Badge>
              <h2 className="font-display text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter">
                Le Goût de
                <br />
                <span className="text-primary">l'Authenticité</span>
              </h2>
              <div className="space-y-4 text-muted-foreground font-medium text-lg">
                <p>
                  Bienvenue chez <span className="text-foreground font-bold italic">Express FOOD</span>. 
                  Fondé par <span className="text-foreground font-bold">MUSSA</span>, notre food truck est né d'une volonté de proposer 
                  une street food de qualité supérieure, 100% Halal, accessible à tous.
                </p>
                <p>
                  Nous sélectionnons rigoureusement nos ingrédients pour vous garantir fraîcheur et saveurs à chaque bouchée. 
                  Notre équipe passionnée s'engage à vous servir avec le sourire et une rapidité exemplaire.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-10">
                <div className="p-4 bg-card border-2 border-primary/10 rounded-2xl shadow-sm">
                  <div className="font-display text-3xl md:text-4xl font-black text-primary italic">100%</div>
                  <div className="text-[10px] md:text-sm font-bold uppercase tracking-wider text-muted-foreground truncate">HALAL</div>
                </div>
                <div className="p-4 bg-card border-2 border-primary/10 rounded-2xl shadow-sm">
                  <div className="font-display text-3xl md:text-4xl font-black text-primary italic leading-none mb-1">QUALITÉ</div>
                  <div className="text-[10px] md:text-sm font-bold uppercase tracking-wider text-muted-foreground truncate">GARANTIE</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-primary p-8 md:p-12 rounded-3xl text-primary-foreground relative overflow-hidden group shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/20 transition-all duration-700" />
              <Utensils className="w-16 h-16 mb-6 opacity-20" />
              <h3 className="font-display text-3xl md:text-4xl font-black mb-6 uppercase tracking-tighter leading-none">
                Événements & Service Traiteur
              </h3>
              <p className="text-lg opacity-90 font-medium mb-8 leading-relaxed">
                Nous proposons un service de préparation de nourriture pour vos anniversaires, fêtes et événements spéciaux. 
                Que ce soit pour un petit comité ou un grand événement, nous vous offrons des plats savoureux et de qualité. 
                Contactez-nous pour discuter de votre projet et obtenir un devis personnalisé.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild
                  className="bg-white text-primary hover:bg-white/90 font-black h-14 px-8 text-lg"
                >
                  <a href="mailto:expressfoodvd@gmail.com">DEVIS PERSONNALISÉ</a>
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 font-black h-14 px-8 text-lg"
                >
                  <a href="tel:0797118555">NOUS APPELER</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section id="emplacements" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-12 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <Badge className="mb-4 bg-primary text-primary-foreground font-bold">PLANNING</Badge>
              <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter">Où nous trouver</h2>
            </div>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 font-bold gap-2 w-full md:w-auto">
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                <MapPin className="w-5 h-5" />
                VOIR SUR GOOGLE MAPS
              </a>
            </Button>
          </div>

          <div className="grid lg:grid-cols-7 gap-4">
            {schedule.map((item, index) => (
              <motion.div
                key={item.day}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`h-full transition-all ${item.active ? 'border-primary ring-2 ring-primary/20 bg-primary/5 shadow-xl' : 'hover:border-primary/30 opacity-80'}`}>
                  <CardContent className="p-5 flex flex-col h-full">
                    <div className="font-display font-black text-2xl mb-4 italic uppercase text-primary">
                      {item.day}
                    </div>
                    <div className="flex-1">
                      <p className={`font-bold text-sm mb-2 ${item.location === "Fermé" ? 'text-muted-foreground' : 'text-foreground'}`}>
                        {item.location}
                      </p>
                      {item.location !== "Fermé" && (
                        <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.hours}
                        </p>
                      )}
                    </div>
                    {item.active && (
                      <div className="mt-4 inline-flex items-center gap-2 text-xs font-black text-primary uppercase italic">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        AUJOURD'HUI
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="py-16 bg-foreground text-background">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl md:text-6xl font-black mb-8 uppercase italic tracking-tighter">
            Prêt à commander ?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a 
                href="tel:0797118555" 
                className="flex flex-col items-center gap-4 p-8 bg-background text-foreground rounded-3xl border-2 border-primary group hover:bg-primary hover:text-white transition-all shadow-xl"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 group-hover:bg-white/20 flex items-center justify-center">
                  <Phone className="w-8 h-8 text-primary group-hover:text-white" />
                </div>
                <div className="text-center">
                  <p className="font-black text-2xl">079 711 85 55</p>
                  <p className="font-bold text-sm uppercase opacity-60">Appelez-nous</p>
                </div>
              </a>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a 
                href="mailto:expressfoodvd@gmail.com" 
                className="flex flex-col items-center gap-4 p-8 bg-background text-foreground rounded-3xl border-2 border-primary group hover:bg-primary hover:text-white transition-all shadow-xl"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 group-hover:bg-white/20 flex items-center justify-center">
                  <Mail className="w-8 h-8 text-primary group-hover:text-white" />
                </div>
                <div className="text-center">
                  <p className="font-black text-2xl">expressfoodvd@gmail.com</p>
                  <p className="font-bold text-sm uppercase opacity-60">Écrivez-nous</p>
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-5xl font-black mb-12 uppercase text-center tracking-tighter">
            Ce que nos clients en disent
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 bg-card rounded-2xl border border-border shadow-sm"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary text-lg">★</span>
                ))}
              </div>
              <p className="text-foreground mb-4">"Je recommande vivement : ils sont très gentils et talentueux, et la nourriture est délicieuse."</p>
              <p className="font-bold text-sm">- Mussa</p>
              <p className="text-xs text-muted-foreground">Gare de Pully</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 bg-card rounded-2xl border border-border shadow-sm"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary text-lg">★</span>
                ))}
              </div>
              <p className="text-foreground mb-4">"L'accueil est chaleureux, la nourriture est super bonne et les portions sont bien généreuses. Je recommande 👍"</p>
              <p className="font-bold text-sm">- Yasmina Kazakova</p>
              <p className="text-xs text-muted-foreground">Place de la Riponne</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 bg-card rounded-2xl border border-border shadow-sm"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary text-lg">★</span>
                ))}
              </div>
              <p className="text-foreground mb-4">"Je suis passé par hasard avec ma femme le jeudi à cugy, maintenant on revient tout le jeudi c'est le Meilleur kebab !! Qualité prix c'est aussi Top"</p>
              <p className="font-bold text-sm">- Leonardo Gentile</p>
              <p className="text-xs text-muted-foreground">Gymnase de Sévelin</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Flame className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="font-display font-black text-3xl italic tracking-tighter uppercase">
                  Express<span className="text-primary">FOOD</span>
                </span>
              </div>
              <p className="text-white/50 font-medium">
                Street food de qualité supérieure. 100% Halal.
                <br />
                Fraîcheur et rapidité garanties.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center gap-6 mb-4">
                <a href="#" className="hover:text-primary transition-colors"><Instagram className="w-8 h-8" /></a>
                <a href="https://www.facebook.com/people/Expressfood-Vd/pfbid02GbJcRhddr4bu62Y5PXCJhEKtn1RZj1ytHxvniSEYJbEijXNDHG2FBgvzuLJq4ddel/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><Facebook className="w-8 h-8" /></a>
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-white/40">Suivez l'aventure</p>
            </div>
            <div className="text-center md:text-right">
              <Button asChild variant="link" className="text-white hover:text-primary p-0 h-auto font-bold uppercase italic text-lg">
                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 md:ml-auto justify-center md:justify-end">
                  Nous localiser <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/30 text-xs font-bold uppercase tracking-widest">
            © 2026 Express FOOD. TOUS DROITS RÉSERVÉS.
          </div>
        </div>
      </footer>
    </div>
  );
}
