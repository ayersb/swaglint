import { readFileSync } from 'fs';

export interface FileSource {
	/** The absolute file path, including name and extension */
	path: string;
	/** The contents of the file. */
	contents?: string;
}

export class File {
	/** The source of the file. */
	public readonly source: FileSource;

	/**
	 * Create a new file instance based on a file source.
	 */
	public constructor(source: FileSource) {
		this.source = source;
	}

	/**
	 * The the full path and file name of the file.
	 */
	public getPath(): string {
		return this.source.path || '<unknown>';
	}

	/**
	 * Get the contents of the file, as string.
	 */
	public getContents(): string {
		if (!this.source.contents) {
			this.source.contents = readFileSync(this.source.path, 'utf8');
		}

		return this.source.contents;
	}

	/**
	 * Determine if the file is a swagger specification.
	 */
	public isSwagger(): boolean {
		const header = this.getContents()
			.slice(0, 1000)
			.split(/\n/)
			.slice(0, 3);
		const pattern = /^["']?swagger["']?\s*:\s*["']?\d+\.\d+["']?/i;

		return header.some(line => pattern.test(line));
	}
}
