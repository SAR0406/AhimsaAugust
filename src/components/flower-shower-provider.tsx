"use client";

import { useFlowerShowerStore } from '@/store/flower-shower-store';
import { FlowerShower } from '@/components/flower-shower';

export function FlowerShowerProvider() {
    const { showFlowerPreview } = useFlowerShowerStore();
    return <FlowerShower show={showFlowerPreview} />;
}
