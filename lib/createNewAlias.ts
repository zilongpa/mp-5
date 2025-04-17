"use server";
import getCollection, { ALIAS_COLLECTION } from "@/db";
import { AliasProps } from "@/types";

export default async function createNewAlias(alias: string, url: string): Promise<AliasProps | string> {
    const aliasCollection = await getCollection(ALIAS_COLLECTION);
    const data = await aliasCollection.findOne({ alias: alias });

    if (data != null) {
        return "Invalid alias: This alias already exists";
    }

    if (url.startsWith("https://mp-5-peach.vercel.app") || url.startsWith("http://mp-5-peach.vercel.app")) {
        return "Invalid URL: Cycles are not allowed";
    }

    if (encodeURIComponent(alias) !== alias || alias.length === 0) {
        return "Invalid alias: You may only use valid URL characters";
    }

    try {
        if (url.length === 0 || !(await fetch(url, { method: "HEAD" })).ok) {
            return "Invalid URL: Could not verify URL. Please try again.";
        }
    } catch {
        return "Invalid URL: Could not verify URL. Please try again.";
    }

    const a = {
        alias: alias,
        url: url,
    };

    const result = await aliasCollection.insertOne({ ...a });

    return { ...a, id: result.insertedId.toHexString() };
}
