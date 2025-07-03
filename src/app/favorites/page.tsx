"use client";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Briefcase,
  Compass,
  Heart,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FavoritesPage() {
  const { favorites: favoriteProducts, toggleFavorite } = useFavorites();

  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={handleBack} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Favorites</h1>
          <p className="text-gray-600">Items you&apos;ve saved for later</p>
        </div>
      </div>

      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="products" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            Products ({favoriteProducts?.length})
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            {/* Projects ({favoriteProjects.length}) */}
          </TabsTrigger>
          <TabsTrigger value="experiences" className="flex items-center gap-2">
            <Compass className="h-4 w-4" />
            {/* Experiences ({favoriteExperiences.length}) */}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="mt-6">
          {favoriteProducts?.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No favorite products yet
              </h3>
              <p className="text-gray-500 mb-4">
                Start exploring and save products you love
              </p>
              <Link href="/market" className={cn(buttonVariants())}>
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteProducts?.map((product) => (
                <Card key={product.id} className="overflow-hidden pt-0">
                  <div className="aspect-square bg-gray-100 relative">
                    {product.image_urls?.[0] ? (
                      <Image
                        src={product.image_urls[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        width={400}
                        height={400}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <ShoppingBag className="h-12 w-12 text-gray-300" />
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white/90"
                      onClick={() => {
                        toggleFavorite.mutate({
                          product: product,
                          action: "remove",
                        });
                      }}
                    >
                      <Heart className="h-4 w-4 fill-current text-red-500" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {product.name}
                    </h3>
                    <p className="text-2xl font-bold text-green-600 mb-2">
                      R$ {Number(product.price || 0).toFixed(2)}
                    </p>
                    <div className="flex gap-2 mb-3">
                      <Badge variant="secondary">{product.category}</Badge>
                      {product.available && (
                        <Badge className="bg-green-100 text-green-800">
                          Available
                        </Badge>
                      )}
                    </div>
                    <Link
                      href={`product/${product.id}`}
                      className={cn(buttonVariants(), "w-full")}
                    >
                      View Product
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="projects" className="mt-6">
          {/* {favoriteProjects.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No favorite projects yet
              </h3>
              <p className="text-gray-500 mb-4">
                Discover amazing projects from the community
              </p>
              <Button onClick={() => handleNavigation("/social")}>
                Explore Projects
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {favoriteProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <div className="aspect-video bg-gray-100 relative">
                    {project.image_urls?.[0] ? (
                      <Image
                        src={project.image_urls[0]}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Briefcase className="h-12 w-12 text-gray-300" />
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white/90"
                      onClick={() => removeFavorite("project", project.id)}
                    >
                      <Heart className="h-4 w-4 fill-current text-red-500" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex gap-2 mb-3">
                      <Badge variant="outline">{project.category}</Badge>
                      {project.status && (
                        <Badge className="bg-blue-100 text-blue-800">
                          {project.status}
                        </Badge>
                      )}
                    </div>
                    <Button
                      className="w-full"
                      onClick={() =>
                        handleNavigation(`/projects/${project.id}`)
                      }
                    >
                      View Project
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )} */}
        </TabsContent>

        <TabsContent value="experiences" className="mt-6">
          {/* {favoriteExperiences.length === 0 ? (
            <div className="text-center py-12">
              <Compass className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No favorite experiences yet
              </h3>
              <p className="text-gray-500 mb-4">
                Find unique experiences to save for later
              </p>
              <Button onClick={() => handleNavigation("/experiences")}>
                Browse Experiences
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteExperiences.map((experience) => (
                <Card key={experience.id} className="overflow-hidden">
                  <div className="aspect-square bg-gray-100 relative">
                    {experience.image_urls?.[0] ? (
                      <Image
                        src={experience.image_urls[0]}
                        alt={experience.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Compass className="h-12 w-12 text-gray-300" />
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white/90"
                      onClick={() =>
                        removeFavorite("experience", experience.id)
                      }
                    >
                      <Heart className="h-4 w-4 fill-current text-red-500" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {experience.name}
                    </h3>
                    <p className="text-2xl font-bold text-green-600 mb-2">
                      {experience.price === 0
                        ? "Free"
                        : `R$ ${Number(experience.price || 0).toFixed(2)}`}
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      {experience.average_rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-current text-yellow-500" />
                          <span className="text-sm font-medium">
                            {experience.average_rating.toFixed(1)}
                          </span>
                        </div>
                      )}
                      {experience.duration && (
                        <Badge variant="outline">{experience.duration}</Badge>
                      )}
                    </div>
                    <Button className="w-full">View Experience</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )} */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
