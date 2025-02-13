import { useLanguage } from "@/components/custom/language-select.tsx/language-select-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import styles from "./project-card.module.css";

type projectStack = {
  imgPath: string;
  name: string;
};
type ProjectCardProps = {
  className?: string;
  project: {
    EN: {
      title: string;
      description: string[];
    };
    FR: {
      title: string;
      description: string[];
    };
    projectLink: string;
    githubLink: string;
    projectImgLink: string;
    stack: projectStack[];
  };
};

const ProjectCard = ({ className, project }: ProjectCardProps) => {
  const [isCardHeaderHovered, setIsCardHeaderHovered] = useState(false);
  const { language } = useLanguage();
  return (
    <Card
      style={{
        borderRadius: "0px",
        transition: "all 0.3s ease-in-out",
      }}
      className={cn(
        "w-[380px] hover:border-none  bg-transparent hover:rounded-none",
        className
      )}
    >
      <CardHeader>
        <div
          onMouseEnter={() => {
            setIsCardHeaderHovered(true);
          }}
          onMouseLeave={() => {
            setIsCardHeaderHovered(false);
          }}
          onClick={() => {
            window.open(project.projectLink, "_blank", "noopener,noreferrer");
          }}
          className={`${
            project.projectLink.trim().length > 0
              ? "cursor-pointer  hover:shadow-xl"
              : ""
          } relative flex items-center space-x-4 rounded-md border  object-fit hover:rounded-none`}
        >
          <div className="flex-1 space-y-1 max-h-[130px] flex justify-center">
            <img className="max-h-[130px]" src={project.projectImgLink}></img>
          </div>
          {project.projectLink.trim().length > 0 && (
            <div className="absolute flex flex-row gap-1 top-3 right-2 ">
              <ExternalLink
                style={{
                  transition: "all 0.3s ease-in-out",
                  transform: "translate",
                }}
                className={` ${
                  isCardHeaderHovered
                    ? "text-spfg w-5 h-5 " + styles["jump"]
                    : "w-5 h-5"
                }`}
              ></ExternalLink>
              <div>Live</div>
            </div>
          )}
        </div>
        <CardTitle className={`text-start text-base pt-2`}>
          <span
            onClick={() => {
              window.open(project.projectLink, "_blank", "noopener,noreferrer");
            }}
            className={`  ${
              project.projectLink.trim().length > 0
                ? "cursor-pointer hover:border-b border-spfg pb-1"
                : ""
            }`}
          >
            {language === "EN" ? project.EN.title : project.FR.title}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          {language === "EN"
            ? project.EN.description.map((desc, index) => (
                <div
                  key={index}
                  className=" grid grid-cols-[25px_1fr] items-start pb-1 last:mb-0 last:pb-0"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-spfg" />
                  <div className="text-start">
                    <p className="text-[0.8rem] leading-0 ">{desc}</p>
                  </div>
                </div>
              ))
            : project.FR.description.map((desc, index) => (
                <div
                  key={index}
                  className="mb-4 grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-spfg" />
                  <div className=" text-start">
                    <p className="text-xs font-medium leading-none ">{desc}</p>
                  </div>
                </div>
              ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-row gap-2">
            {project.stack.map((tech, index) => {
              return (
                <Tooltip key={index}>
                  <TooltipTrigger className="whitespace-nowrap overflow-hidden ">
                    <img
                      src={tech.imgPath}
                      alt={tech.name}
                      style={{
                        width: "25px",
                        height: "25px",
                        borderRadius: "3px",
                      }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{tech.name}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
          <Button
            className="flex flex-row "
            variant="outline"
            onClick={() => {
              window.open(project.githubLink, "_blank", "noopener,noreferrer");
            }}
          >
            <span className="text-start text-sm">View Project</span>
            <img className="pl-4 w-10" src="github.png"></img>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
