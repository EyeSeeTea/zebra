import React from "react";
import { CardContent, Card } from "@material-ui/core";
import styled from "styled-components";

type StatsCardProps = {
    color?: "normal" | "green" | "red";
    stat: string;
    pretitle?: string;
    title: string;
    subtitle?: string;
    isPercentage?: boolean;
    error?: boolean;
    size?: "small" | "large";
};

export const StatsCard: React.FC<StatsCardProps> = React.memo(
    ({
        stat,
        title,
        subtitle,
        pretitle,
        color = "normal",
        isPercentage = false,
        error = false,
        size,
    }) => {
        return (
            <StyledCard $error={error} $size={size}>
                <StyledCardContent>
                    <Stat color={color}>{`${stat}${isPercentage ? " %" : ""}`}</Stat>

                    <PreTitle>{pretitle}</PreTitle>

                    <Title>{title}</Title>

                    <SubTitle>{subtitle}</SubTitle>
                </StyledCardContent>
            </StyledCard>
        );
    }
);

const StyledCard = styled(Card)<{ $error?: boolean; $size?: string }>`
    width: ${props => (!props.$size ? "fit-content" : props.$size === "small" ? "220px" : "300px")};
    min-width: 220px;
    max-width: 300px;
    border-style: ${props => (props.$error ? "solid" : "none")};
    border-width: ${props => (props.$error ? "1px" : "0")};
    border-color: ${props => (props.$error ? props.theme.palette.stats.red : "unset")};
`;

const StyledCardContent = styled(CardContent)`
    padding-inline: 66px;
    padding-block: 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
`;

const Stat = styled.div<{ color: string }>`
    color: ${props => props.theme.palette.stats[props.color]};
    font-size: 2em;
    font-weight: 400;
`;

const PreTitle = styled.span`
    color: ${props => props.theme.palette.stats.pretitle};
    font-weight: 400;
    font-size: 0.875rem;
    text-align: center;
`;

const Title = styled.span`
    color: ${props => props.theme.palette.stats.title};
    font-weight: 700;
    font-size: 1rem;
    text-align: center;
`;

const SubTitle = styled.span`
    color: ${props => props.theme.palette.stats.subtitle};
    font-weight: 400;
    font-size: 0.875rem;
    text-align: center;
`;
